import { Router } from 'express';
import { CartManager } from '@core/CartManager';

const router = Router();
const cartManager = new CartManager('./src/data');

router.get('/', async (req, res) => {
  try {
    const carts = await cartManager.getCarts();
    res.status(200).send({
      status: 200,
      message: carts,
    });
  } catch (err: any) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

export default router;
