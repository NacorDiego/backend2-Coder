import { Request, Response } from 'express';

export const viewLoginForm = (req: Request, res: Response) => {
  res.render('login');
};

export const viewRegistrationForm = (req: Request, res: Response) => {
  res.render('register');
};

export const viewUserProfile = (req: Request, res: Response) => {
  res.render('profile', { user: req.session.user });
};
