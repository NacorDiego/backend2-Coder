import { Request, Response, NextFunction } from 'express';

//TODO: Solucionar error de req.user.role
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') return next();
  else
    return res.status(403).json({
      error:
        'Acceso denegado: No tienes permisos suficientes para realizar esta acción.',
    });
};
