import { Router } from 'express';
import * as usersController from '@controllers/users.controller';
import passport from 'passport';
import { isAuthenticated } from '@middlewares/auth.middleware';

const router = Router();

router.get('/logout', isAuthenticated, usersController.userLogout);
router.post('/register', usersController.userRegister);
router.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true, // Utilizar flash para errores
  }),
);

export default router;
