import { Router } from 'express';
import * as productController from '../controllers/products.controller';
import { isAuthenticated } from '@middlewares/auth.middleware';

const router = Router();

router.post('/', isAuthenticated, productController.createProduct);
router.get('/', isAuthenticated, productController.getProducts);
router.get('/:pid', isAuthenticated, productController.getProductById);
router.put('/:pid', isAuthenticated, productController.updateProductById);
router.delete('/:pid', isAuthenticated, productController.deleteProductById);

export default router;
