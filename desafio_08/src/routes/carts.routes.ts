import { Router } from 'express';
import * as cartController from '../controllers/carts.controller';

const router = Router();

router.get('/', cartController.getCarts);
router.get('/:cid', cartController.getCartById);
router.post('/', cartController.createCart);
router.post('/:cid/products/:pid', cartController.addProductToCart);
router.put('/:cid', cartController.updateCart);
router.put('/:cid/products/:pid', cartController.updateProductQuantity);
router.delete('/:cid/products/:pid', cartController.removeProductFromCart);
router.delete('/:cid', cartController.removeAllProductsFromCart);

export default router;
