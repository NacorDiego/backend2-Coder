import { Router } from 'express';
import cookieParser from 'cookie-parser';
import { Request, Response } from 'express';

const router = Router();

// Cookie sin firma
// router.use(cookieParser());

// Cookie sin firma
router.use(cookieParser('CoderS3cr3tC0d3')); //Cualquier cadena puede ir

router.get('/', (req: Request, res: Response) => {
  res.render('index', {});
});

// Seteo una cookie
router.get('/setCookie', (req: Request, res: Response) => {
  // Sin firma
  res
    .cookie('CoderCookie', 'Esto es una cookie de prueba - Cookie set', {
      maxAge: 10000, // Tiempo de vida
    })
    .send('Cookie asignada con éxito');

  // Con firma
  res
    .cookie('CoderCookie', 'Esto es una cookie de prueba - Cookie set', {
      maxAge: 10000, // Tiempo de vida
      signed: true, // Indica que tiene firma
    })
    .send('Cookie asignada con éxito');
});

// Obtengo todas las cookies
router.get('/getCookie', (req: Request, res: Response) => {
  // Sin firma
  // res.send(req.cookies);

  // Con firma
  res.send(req.signedCookies);
});

// Limpiar cookie (igual con firma que sin firma)
router.get('/removeCookie', (req: Request, res: Response) => {
  res.clearCookie('CoderCookie').send('Cookie eliminada correctamente');
});

export default router;
