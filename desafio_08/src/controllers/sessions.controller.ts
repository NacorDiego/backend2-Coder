import { Request, Response } from 'express';
import * as sessionService from '@services/dao/db/session.service';
import { User } from '@interfaces/users.interface';

// declare module se utilizan para poder crear sesión.
declare module 'express-session' {
  interface SessionData {
    user: User; // Agrega tu propiedad de usuario aquí
  }
}

export const userRegister = async (req: Request, res: Response) => {
  const { first_name, last_name, email, age, password } = req.body;

  const registerData = {
    first_name,
    last_name,
    email,
    age,
    password,
  };

  try {
    const result = await sessionService.userRegisterService(registerData);

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
    const result = await sessionService.userLoginService(loginData);
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
    if (err)
      res
        .status(500)
        .json({ status: 'FAILED', message: 'Error al cerrar la sesion.' });
    res
      .status(200)
      .json({ status: 'OK', message: 'Sesion cerrada correctamente.' });
  });
};
