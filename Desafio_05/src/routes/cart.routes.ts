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
    await cartManager.createCart();
    res.status(200).send({
      status: 200,
      //TODO: Debe devolver el carrito creado.
      message: 'Carrito creado con éxito.',
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
        message: `No existe un producto con ese ID.`,
      });
    }
    await cartManager.addProductToCart(cartId, productId);
    res.status(200).send({
      status: 200,
      message: 'Producto agregado al carrito.',
    });
  } catch (err: any) {
    res.status(500).send({
      status: 500,
      message: `Error al agregar el producto al carrito: ${err.message}`,
    });
  }
});

export default router;
