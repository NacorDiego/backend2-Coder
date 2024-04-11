import { NextFunction, Request, Response } from 'express';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.isAuthenticated()) {
    console.log('Esta autenticado');
    return next();
  }
  console.log('No está autenticado');
  res.redirect('/login');
};
