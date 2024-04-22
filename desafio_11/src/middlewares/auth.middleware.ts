import { NextFunction, Request, Response } from 'express';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // req.flash('error_msg', 'No estás autorizado.');
  res.redirect('/login');
};
