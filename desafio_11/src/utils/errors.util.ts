import { Response } from 'express';

const createErrorFactory = function (name: string) {
  return class BusinessError extends Error {
    constructor(message: string) {
      super(message);
      this.name = name;
    }
  };
};

export const errorHandler = (error: any, res: Response) => {
  if (error instanceof ValidationError)
    res.status(400).json({ status: 'FAILED', message: error.message });
  else if (error instanceof NotFoundError)
    res.status(404).json({ status: 'FAILED', message: error.message });
  else if (error instanceof ConflictError)
    res.status(409).json({ status: 'FAILED', message: error.message });
  else if (error instanceof ConnectionError)
    res.status(500).json({ status: 'FAILED', message: error.message });
  else
    res
      .status(500)
      .json({ status: 'FAILED', message: 'Error interno del servidor.' });
};

export const ConnectionError = createErrorFactory('ConnectionError');
export const ValidationError = createErrorFactory('ValidationError');
export const NotFoundError = createErrorFactory('NotFoundError');
export const ConflictError = createErrorFactory('ConflictError');
