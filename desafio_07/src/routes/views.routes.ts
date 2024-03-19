import { Router } from 'express';
import {
  renderProducts,
  renderRealTimeProducts,
} from '@controllers/views.controller';
import { showChat } from '@controllers/chat.controller';

const router = Router();

router.get('/', renderProducts);

router.get('/realtimeproducts', renderRealTimeProducts);

router.get('/chat', showChat);

export default router;
