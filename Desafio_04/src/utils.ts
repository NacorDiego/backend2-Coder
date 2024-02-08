// Configuración de multer
import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

const storage = multer.diskStorage({
  // Ubicacion donde voy a guardar los archivos
  destination: function (req, file, callback) {
    callback(null, `${__dirname}src/public/img`);
  },
  // Nombre de los archivos
  filename: function (req, file, callback) {
    callback(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploader = multer({ storage });

// Middleware de manejo de errores de multer
export const handleMulterError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof multer.MulterError) {
    // Si el error es de multer
    console.error('Error de multer:', err);
    res.status(500).json({ error: 'Error al subir el archivo' });
  } else {
    // Si es otro tipo de error
    next(err); // Pasar al siguiente middleware de manejo de errores
  }
};
