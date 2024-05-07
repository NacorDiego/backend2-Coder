import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

// Interfaces
import { JwtPayload } from '@interfaces/users.interface';

// Configs
import { configJWT } from 'src/configs/config';

// Decodificar el JWT con la info del user y guardarla en req.user
export const decodeJWT = (req: Request, res: Response, next: NextFunction) => {
  console.log('DECODEJWT');

  const tokenJWT = req.cookies.jwt;

  if (tokenJWT) {
    console.log('Existe tokenJWT');
    const decodedToken: JwtPayload = jwt.verify(
      tokenJWT,
      configJWT.jwt_secret,
    ) as JwtPayload;

    req.user = decodedToken.userJWT;
    console.log('req.user:');
    console.log(req.user);
  }

  next();
};
