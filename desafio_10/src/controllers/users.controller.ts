import { Request, Response } from 'express';
import * as usersService from '@services/dao/db/users.service';
import { NewUser } from '@interfaces/users.interface';
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
    password,
    role: 'user',
  };

  if (email === 'adminCoder@coder.com' && password === 'adminCod3r123')
    registerData.role = 'admin';

  try {
    await usersService.userRegisterService(registerData);
    // req.flash('success_msg', 'Usuario registrado con éxito');
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
  // Creo cookie de msg success
  res.cookie('success_msg', 'El login fue exitoso.');
  res.redirect('/');
};

export const userLogout = (req: Request, res: Response) => {
  req.logout(() => {});
  res.cookie('success_msg', 'Sesión cerrada con éxito.');
  res.redirect('/login');
};
