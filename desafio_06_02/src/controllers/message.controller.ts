import { Request, Response } from 'express';

export const getMessages = async (req: Request, res: Response) => {
  res.render('chat');
};
