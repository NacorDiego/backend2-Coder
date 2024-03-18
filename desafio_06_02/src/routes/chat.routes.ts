import { Router } from 'express';
import { showChat } from '@controllers/chat.controller';

const router = Router();

router.get('/', showChat);

export default router;
