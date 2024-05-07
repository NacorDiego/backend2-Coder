import { Router } from 'express';

// Controllers
import * as productController from '../controllers/products.controller';

const router = Router();

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/:pid', productController.getProductById);
router.put('/:pid', productController.updateProductById);
router.delete('/:pid', productController.deleteProductById);

export default router;
