import { Router } from 'express';
import * as viewsController from '@controllers/views.controller';
import * as chatController from '@controllers/chats.controller';
import { decodeJWT } from '@middlewares/decodeJWT.middleware';

const router = Router();

router.get('/', decodeJWT, viewsController.renderProducts);
router.get('/edit-product/:id', viewsController.renderEditProductForm);
router.get('/realtimeproducts', viewsController.renderRealTimeProducts);
router.get('/chat', chatController.showChat);
router.get('/register', viewsController.viewRegistrationForm);
router.get('/login', viewsController.viewLoginForm);
router.get('/login-github', viewsController.viewLoginWithGithub);
router.get('/profile', decodeJWT, viewsController.viewUserProfile);
router.get('/recover-password', viewsController.viewsRecoverPassword);

export default router;
