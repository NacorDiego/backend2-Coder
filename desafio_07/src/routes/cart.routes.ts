import { Router } from 'express';
import {
  getCarts,
  getCartById,
  createCart,
  addProductToCart,
  updateCart,
  updateProductQuantity,
  removeProductFromCart,
  removeAllProductsFromCart,
} from '../controllers/cart.controller';
const router = Router();
router.get('/', getCarts);
router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/:cid/product/:pid', addProductToCart);
router.put('/:cid', updateCart);
router.put('/:cid/products/:pid', updateProductQuantity);
router.delete('/:cid/products/:pid', removeProductFromCart);
router.delete('/:cid', removeAllProductsFromCart);
export default router;
