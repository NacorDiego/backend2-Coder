import { Router } from 'express';
import { cartManager } from '@core/index';
import { productManager } from '@core/index';

const router = Router();

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

router.get('/:cid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid as string, 10);
    const cart = await cartManager.getCartById(cartId);
    if (!cart) {
      return res.status(404).send({
        status: 404,
        message: 'Error: No existe ningún carrito con ese ID.',
      });
    }
    res.status(200).send({
      status: 200,
      message: cart,
    });
  } catch (err: any) {
    res.status(500).send({
      status: 500,
      message: `${err.message}`,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const cartAdded = await cartManager.createCart();
    res.status(200).send({
      status: 200,
      message: cartAdded,
    });
  } catch (err: any) {
    res.status(500).send({
      status: 500,
      message: `Error al crear el carrito: ${err.message}`,
    });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cartId = parseInt(req.params.cid, 10);
    const productId = parseInt(req.params.pid, 10);
    const product = await productManager.getProductById(productId);
    if (!product) {
      return res.status(404).send({
        status: 404,
        message: `Error al agregar el producto al carrito: No existe un producto con ese ID.`,
      });
    }
    const cartUpdated = await cartManager.addProductToCart(cartId, productId);
    res.status(200).send({
      status: 200,
      message: cartUpdated,
    });
  } catch (err: any) {
    if (err.message.includes('No existe un carrito con ese ID')) {
      res.status(404).send({
        status: 404,
        message: `Error al agregar el producto al carrito: ${err.message}`,
      });
    } else {
      res.status(500).send({
        status: 500,
        message: `Error al agregar el producto al carrito: ${err.message}`,
      });
    }
  }
});

export default router;
