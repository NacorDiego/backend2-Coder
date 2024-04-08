import { Request, Response, Router } from 'express';
import * as viewsController from '@controllers/views.controller';
import * as chatController from '@controllers/chats.controller';

const router = Router();

// router.get('/', (req: Request, res: Response) => {
//   res.render('index');
// });
router.get('/', viewsController.renderProducts);
router.get('/edit-product/:id', viewsController.renderEditProductForm);
router.get('/realtimeproducts', viewsController.renderRealTimeProducts);
router.get('/chat', chatController.showChat);
router.get('/register', viewsController.viewRegistrationForm);
router.get('/login', viewsController.viewLoginForm);
router.get('/profile', viewsController.viewUserProfile);

export default router;
