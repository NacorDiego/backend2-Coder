import { JwtPayload } from '@interfaces/users.interface';
import { NextFunction, Request, Response } from 'express';
import { configJWT } from 'src/config/config';
import jwt from 'jsonwebtoken';

// Decodificar el JWT con la info del user y guardarla en req.user
export const decodeJWT = (req: Request, res: Response, next: NextFunction) => {
  const tokenJWT = req.cookies.jwt;

  if (tokenJWT) {
    const decodedToken: JwtPayload = jwt.verify(
      tokenJWT,
      configJWT.jwt_secret,
    ) as JwtPayload;

    req.user = decodedToken.user;
  }

  next();
};
