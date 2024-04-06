import { Request, Response } from 'express';
import * as usersService from '@services/dao/db/users.service';
import { SessionUser } from '@interfaces/users.interface';

// declare module se utilizan para poder crear sesión.
declare module 'express-session' {
  interface SessionData {
    user: SessionUser; // Agrega tu propiedad de usuario aquí
  }
}

interface NewUser {
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  password: string;
  role: string;
}

export const userRegister = async (req: Request, res: Response) => {
  const errors = [];
  const { first_name, last_name, email, age, password, confirm_password } =
    req.body;

  if (password !== confirm_password) {
    errors.push({ text: 'Las contraseñas no coinciden' });
  }
  if (password.length < 4)
    errors.push({ text: 'Las contraseñas deben tener al menos 4 caracteres' });

  if (errors.length > 0) res.render('users/signup', { errors });
  else res.send('Registro exitoso');

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
    const result = await usersService.userRegisterService(registerData);

    res.status(201).json({ status: 'OK', data: result });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', error: error?.message || error });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const loginData = {
    email,
    password,
  };

  try {
    const result = await usersService.userLoginService(loginData);
    // Creo la sesión del usuario
    req.session.user = result;

    res.status(200).json({ status: 'OK', data: result });
  } catch (error: any) {
    res
      .status(error?.status || 500)
      .json({ status: 'FAILED', error: error?.message || error });
  }
};

export const userLogout = (req: Request, res: Response) => {
  req.session.destroy(err => {
    if (err) {
      res
        .status(500)
        .json({ status: 'FAILED', message: 'Error al cerrar la sesión.' });
    } else {
      res.redirect('/api/users/login');
    }
  });
};
