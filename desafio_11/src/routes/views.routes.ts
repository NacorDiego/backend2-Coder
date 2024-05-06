import { Router } from 'express';
import * as viewsController from '@controllers/views.controller';
import * as chatController from '@controllers/chats.controller';
import { decodeJWT } from '@middlewares/decodeJWT.middleware';
import passport from 'passport';

const router = Router();

router.get(
  '/',
  passport.authenticate('jwt', { failureRedirect: '/login', session: false }),
  decodeJWT,
  viewsController.renderProducts,
);
router.get(
  '/edit-product/:id',
  passport.authenticate('jwt', { failureRedirect: '/login', session: false }),
  viewsController.renderEditProductForm,
);
router.get(
  '/realtimeproducts',
  passport.authenticate('jwt', { failureRedirect: '/login', session: false }),
  viewsController.renderRealTimeProducts,
);
router.get(
  '/chat',
  passport.authenticate('jwt', { failureRedirect: '/login', session: false }),
  chatController.showChat,
);
router.get('/register', viewsController.viewRegistrationForm);
router.get('/login', viewsController.viewLoginForm);
router.get('/login-github', viewsController.viewLoginWithGithub);
router.get(
  '/profile',
  passport.authenticate('jwt', { failureRedirect: '/login', session: false }),
  decodeJWT,
  viewsController.viewUserProfile,
);

export default router;
