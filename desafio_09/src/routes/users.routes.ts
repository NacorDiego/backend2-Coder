import { Router } from 'express';
import * as usersController from '@controllers/users.controller';
import passport from 'passport';

const router = Router();

router.get('/logout', usersController.userLogout);
router.post('/register', usersController.userRegister);
router.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true, // Utilizar flash para errores
  }),
  // usersController.userLogin,
);

export default router;
