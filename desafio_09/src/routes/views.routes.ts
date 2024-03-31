import { Router } from 'express';
import * as viewsController from '@controllers/views.controller';
import * as chatController from '@controllers/chats.controller';

const router = Router();

router.get('/', viewsController.renderProducts);
router.get('/realtimeproducts', viewsController.renderRealTimeProducts);
router.get('/chat', chatController.showChat);

export default router;
