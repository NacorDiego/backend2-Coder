import { Router } from 'express';
import * as usersController from '@controllers/users.controller';
import passport from 'passport';

const router = Router();

router.post('/register', usersController.userRegister);

router.post(
  '/login',
  passport.authenticate('login', {
    failureRedirect: '/login',
    session: false,
  }),
  usersController.successfulLogin,
);

router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email'],
    session: false,
  }),
  usersController.userLoginGithub,
);

router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    session: false,
  }),
  usersController.successfulLogin,
);

router.get('/logout', usersController.userLogout);

export default router;
