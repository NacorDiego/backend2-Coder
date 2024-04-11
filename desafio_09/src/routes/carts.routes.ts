import { Router } from 'express';
import * as cartController from '../controllers/carts.controller';
import { isAuthenticated } from '@middlewares/auth.middleware';

const router = Router();

router.get('/', isAuthenticated, cartController.getCarts);
router.get('/:cid', isAuthenticated, cartController.getCartById);
router.post('/', isAuthenticated, cartController.createCart);
router.post(
  '/:cid/products/:pid',
  isAuthenticated,
  cartController.addProductToCart,
);
router.put('/:cid', isAuthenticated, cartController.updateCart);
router.put(
  '/:cid/products/:pid',
  isAuthenticated,
  cartController.updateProductQuantity,
);
router.delete(
  '/:cid/products/:pid',
  isAuthenticated,
  cartController.removeProductFromCart,
);
router.delete(
  '/:cid',
  isAuthenticated,
  cartController.removeAllProductsFromCart,
);

export default router;
