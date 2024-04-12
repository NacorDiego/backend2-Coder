import { Router } from 'express';
import * as usersController from '@controllers/users.controller';
import passport from 'passport';
import { isAuthenticated } from '@middlewares/auth.middleware';

const router = Router();

router.post('/register', usersController.userRegister);
router.post(
  '/login',
  passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true, // Utilizar flash para errores
  }),
);
router.get('/github');
router.get('/logout', isAuthenticated, usersController.userLogout);

export default router;
