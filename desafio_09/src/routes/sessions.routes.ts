import { Router } from 'express';
import * as sessionController from '@controllers/sessions.controller';

const router = Router();

router.post('/register', sessionController.userRegister);
router.post('/login', sessionController.userLogin);
router.get('/logout', sessionController.userLogout);

export default router;
