import { Router } from 'express';
import {
  renderProducts,
  renderRealTimeProducts,
} from '@controllers/views.controller';
import { getMessages } from '@controllers/chat.controller';

const router = Router();

router.get('/', renderProducts);

router.get('/realtimeproducts', renderRealTimeProducts);

router.get('/messages', getMessages);

export default router;
