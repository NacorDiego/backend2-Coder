import { Request, Response } from 'express';
import * as usersService from '@services/dao/db/users.service';
import { NewUser, UserJwt } from '@interfaces/users.interface';
import User from '@models/user.model';
import jwt from 'jsonwebtoken';
import { configJWT } from 'src/config/config';

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

  const registerData: NewUser = {
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
    await usersService.userRegisterService(registerData);
    res.cookie('success_msg', 'Usuario registrado con éxito.');
    res.status(201).redirect('/login');
  } catch (error: any) {
    console.error('error: ', error.message);
    const errors = [{ text: error?.message || 'Error interno del servidor' }];

    res.status(error?.status || 500).render('users/register', { errors });
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

  console.log('GET user:');
  console.log(user);

  if (user && !user.email) {
    res.cookie('githubID', user.githubId);
    return res.render('users/update-data', { pathEndpoint: 'github/callback' });
  }

  // Creo token JWT y lo guardo en cookie
  const token = jwt.sign({ user }, configJWT.jwt_secret);
  res.cookie('jwt', token);
  res.redirect('/');
};

export const updateUserEmailAndPassword = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email, password, confirm_password } = req.body;
    const githubID = req.cookies.githubID;

    matchPasswords(res, password, confirm_password, 'enter-email');

    const hashedPassword = await User.encryptPassword(password);

    const updatedUser = await User.findOneAndUpdate(
      { githubId: githubID },
      { email, password: hashedPassword },
      { new: true },
    );

    if (!updatedUser)
      throw {
        status: 404,
        message: 'No se pudo actualizar el email del usuario.',
      };

    const { _id, first_name, last_name, age, role, githubId } = updatedUser;

    const userJWT: UserJwt = {
      id: _id,
      first_name,
      last_name,
      email,
      age,
      role,
      githubId: parseInt(githubId),
    };

    const token = jwt.sign({ userJWT }, configJWT.jwt_secret);

    res.cookie('jwt', token);

    res.redirect('/');
  } catch (error: any) {
    console.log(error.message || error);

    res.status(error.status || 500).json({
      status: 'FAILED',
      message: error.message || 'Error interno del servidor',
    });
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  const { email, password, confirm_password } = req.body;

  matchPasswords(res, password, confirm_password, 'enter-passwords');

  try {
    const hashedPassword = await User.encryptPassword(password);

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true },
    );

    if (!updatedUser)
      throw {
        status: 500,
        message: 'No se pudo actualizar la contraseña del usuario.',
      };

    res.redirect('/login');
  } catch (error: any) {
    console.log(error.message || error);
    res.status(error.status || 500).json({
      status: 'FAILED',
      message: error.message || 'Error interno del servidor.',
    });
  }
};

export const userLogout = (req: Request, res: Response) => {
  res.clearCookie('jwt');
  res.cookie('success_msg', 'Sesión cerrada con éxito.');
  res.redirect('/login');
};

const matchPasswords = (
  res: Response,
  password: string,
  confirm_password: string,
  view: string,
) => {
  if (password !== confirm_password) {
    res.cookie('error_msg', 'Las contraseñas no coinciden.');
    return res.status(404).render(`users/${view}`);
  }
};
