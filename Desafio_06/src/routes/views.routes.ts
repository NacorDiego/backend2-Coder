import { Router } from 'express';
import { productManager } from '@core/index';
import { Product } from '@interfaces/product.interface';
import { socketServer } from 'src/app';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts(undefined);

    res.status(200).render('home', { products });
  } catch (err: any) {
    res.status(500).send({
      status: 500,
      message: `${err.message}`,
    });
  }
});

router.get('/realtimeproducts', (req, res) => {
  try {
    res.render('realTimeProducts', {});
  } catch (err: any) {
    res.status(500).send({
      status: 500,
      message: `${err.message}`,
    });
  }
});

export default router;
