import passport from 'passport';
import { Router } from 'express';

// Controllers
import * as usersController from '@controllers/users.controller';

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
  usersController.successfulLoginFromGithub,
);

router.post('/github/callback', usersController.updateUserEmailAndPassword);

router.post('/recover-password', usersController.updateUserPassword);

router.get('/logout', usersController.userLogout);

export default router;
