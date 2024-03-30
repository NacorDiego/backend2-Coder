import { Router } from 'express';
import * as userViewsController from '@controllers/users.views.controller';

const router = Router();

router.get('/login', userViewsController.viewLoginForm);
router.get('/register', userViewsController.viewRegistrationForm);
router.get('/', userViewsController.viewUserProfile);

export default router;
