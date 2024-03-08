import { Router } from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from '../controllers/product.controller';

const router = Router();

router.post('/', createProduct);

router.get('/', getProducts);

router.get('/:pid', getProductById);

router.put('/:pid', updateProductById);

router.delete('/:pid', deleteProductById);

export default router;
