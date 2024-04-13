import { Router } from 'express';
import * as usersController from '@controllers/users.controller';
import passport from 'passport';
import { isAuthenticated } from '@middlewares/auth.middleware';
import { Request, Response } from 'express';

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
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  usersController.userLoginGithub,
);
router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
  usersController.githubCallback,
);
router.get('/logout', isAuthenticated, usersController.userLogout);

export default router;
