import { Router } from 'express';
import {
  renderProducts,
  renderRealTimeProducts,
} from '../controllers/views.controller';

const router = Router();

router.get('/', renderProducts);

router.get('/realtimeproducts', renderRealTimeProducts);

export default router;
