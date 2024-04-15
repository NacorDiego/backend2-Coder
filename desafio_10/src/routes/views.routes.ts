import { Request, Response, Router } from 'express';
import * as viewsController from '@controllers/views.controller';
import * as chatController from '@controllers/chats.controller';
import { isAuthenticated } from '@middlewares/auth.middleware';

const router = Router();

router.get('/', isAuthenticated, viewsController.renderProducts);
router.get(
  '/edit-product/:id',
  isAuthenticated,
  viewsController.renderEditProductForm,
);
router.get(
  '/realtimeproducts',
  isAuthenticated,
  viewsController.renderRealTimeProducts,
);
router.get('/chat', isAuthenticated, chatController.showChat);
router.get('/register', viewsController.viewRegistrationForm);
router.get('/login', viewsController.viewLoginForm);
router.get('/login-github', viewsController.viewLoginWithGithub);
router.get('/profile', isAuthenticated, viewsController.viewUserProfile);

export default router;
