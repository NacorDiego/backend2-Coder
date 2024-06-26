import { Request, Response } from 'express';
import * as usersService from '@services/dao/db/users.service';
import { SessionUser, NewUser } from '@interfaces/users.interface';

// declare module se utilizan para poder crear sesión.
declare module 'express-session' {
  interface SessionData {
    user: SessionUser; // Agrega tu propiedad de usuario aquí
  }
}

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
    req.flash('success_msg', 'Usuario registrado con éxito');
    res.status(201).redirect('/login');
  } catch (error: any) {
    console.error('error: ', error.message);
    const errors = [{ text: error?.message || 'Error interno del servidor' }];

    res.status(error?.status || 500).render('users/register', { errors });
  }
};

export const userLoginGithub = (req: Request, res: Response) => {};

export const githubCallback = (req: Request, res: Response) => {
  if (req.user) {
    const user = req.user;
    console.log('sesion de usuario:');
    console.log(user);
  } else console.log('No existe req.user');

  // req.session.user = {
  //   name: `${user.first_name} ${user.last_name}`
  //   email: user.email,
  //   age: user.age
  // }

  // req.session.admin= true

  res.redirect('/login');
  // res.redirect('/');
};

export const userLogout = (req: Request, res: Response) => {
  req.logout(() => {});
  req.flash('success_msg', 'Sesión cerrada con éxito.');
  res.redirect('/login');
};
