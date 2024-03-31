import { Request, Response } from 'express';

export const showChat = (req: Request, res: Response) => {
  res.render('chat', { title: 'Chat' });
};
