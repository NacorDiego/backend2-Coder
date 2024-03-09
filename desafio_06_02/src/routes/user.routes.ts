import { Router } from 'express';
import {
  getUsers,
  createUser,
  updateUserByID,
  deleteUserById,
} from '../controllers/user.controller';

const router = Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:pid', updateUserByID);
router.delete('/:pid', deleteUserById);

export default router;
