import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// Services
import * as UserService from '@services/users.service';

// Interfaces
import { UserJwt } from '@interfaces/users.interface';

// Models
import User from '@models/user.model';

// Configs
import { configJWT } from 'src/configs/config';

// Dtos
import UsersDto from '@dtos/users.dto';
import {
  ConflictError,
  ConnectionError,
  NotFoundError,
  ValidationError,
  errorHandler,
} from '@utils/errors.util';

export const userRegister = async (req: Request, res: Response) => {
  const errors = [];
  const { first_name, last_name, email, age, password, confirm_password } =
    req.body;

  if (password !== confirm_password) {
    errors.push({ text: 'Las contraseñas no coinciden.' });
  }
  if (password.length < 4)
    errors.push({ text: 'Las contraseñas deben tener al menos 4 caracteres.' });

  if (errors.length > 0) {
    const dataUser = {
      first_name,
      last_name,
      email,
      age,
    };
    return res.render('users/register', { errors, dataUser });
  }

  const registerData: Partial<InstanceType<typeof User>> = {
    first_name,
    last_name,
    email,
    age,
    password: await User.encryptPassword(password),
    role: 'user',
  };

  if (email === 'adminCoder@coder.com' && password === 'adminCod3r123')
    registerData.role = 'admin';

  try {
    await UserService.userRegisterService(registerData);
    res.cookie('success_msg', 'Usuario registrado con éxito.');
    res.status(201).redirect('/login');
  } catch (error: any) {
    console.error('error: ', error.message);
    const errors = [{ text: error.message || 'Error interno del servidor' }];

    if (error instanceof ConflictError) {
      res.status(409).render('users/register', { errors });
    } else if (error instanceof ValidationError) {
      res.status(400).render('users/register', { errors });
    } else if (error instanceof ConnectionError) {
      res.status(500).render('users/register', { errors });
    } else {
      res.status(500).render('users/register', { errors });
    }
  }
};

export const userLoginGithub = (req: Request, res: Response) => {};

export const successfulLogin = (req: Request, res: Response) => {
  // Creo token JWT y lo guardo en cookie
  const token = jwt.sign({ user: req.user }, configJWT.jwt_secret);
  res.cookie('jwt', token);
  res.redirect('/');
};

export const successfulLoginFromGithub = (req: Request, res: Response) => {
  const user = req.user as UserJwt;

  if (user && !user.email) {
    res.cookie('githubID', user.githubId);
    return res.render('users/update-data', { pathEndpoint: 'github/callback' });
  }

  // Creo token JWT y lo guardo en cookie
  const token = jwt.sign({ user }, configJWT.jwt_secret);
  res.cookie('jwt', token);
  res.redirect('/login');
};

export const updateUserEmailAndPassword = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email, password, confirm_password } = req.body;
    const githubID = req.cookies.githubID;

    const updatedUser = await UserService.updateUserEmailAndPassword(
      githubID,
      email,
      password,
      confirm_password,
    );

    if (!updatedUser)
      throw new NotFoundError('No se pudo actualizar el email del usuario.');

    const userDto = new UsersDto();
    const userJWT = userDto.fromDatabaseToJwt(updatedUser);

    const token = jwt.sign({ userJWT }, configJWT.jwt_secret);

    res.cookie('jwt', token);

    res.redirect('/');
  } catch (error: any) {
    errorHandler(error, res);
  }
};

//TODO: Dividir con service, repo y dao.
export const updateUserPassword = async (req: Request, res: Response) => {
  try {
    const { email, password, confirm_password } = req.body;

    await UserService.updateUserPassword(email, password, confirm_password);

    res.redirect('/login');
  } catch (error: any) {
    console.log(error.message || error);

    errorHandler(error, res);
  }
};

export const userLogout = (req: Request, res: Response) => {
  res.clearCookie('jwt');
  res.cookie('success_msg', 'Sesión cerrada con éxito.');
  res.redirect('/login');
};
