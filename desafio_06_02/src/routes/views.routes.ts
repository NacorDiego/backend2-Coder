import { Router } from 'express';
import {
  renderProducts,
  renderRealTimeProducts,
} from '@controllers/views.controller';
import { getMessages } from '@controllers/message.controller';

const router = Router();

router.get('/', renderProducts);

router.get('/realtimeproducts', renderRealTimeProducts);

router.get('/messages', getMessages);

export default router;
