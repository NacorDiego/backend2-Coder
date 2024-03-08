import { Router } from 'express';
import {
  getCarts,
  getCartById,
  createCart,
  addProductToCart,
} from '../controllers/cart.controller';

const router = Router();

router.get('/', getCarts);

router.get('/:cid', getCartById);

router.post('/', createCart);

router.post('/:cid/product/:pid', addProductToCart);

export default router;
