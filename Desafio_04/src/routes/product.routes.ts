import { Router } from 'express';
import { ProductManager } from '@core/ProductManager';
import { Product } from '@interfaces/product.interface';

const router = Router();
const productManager = new ProductManager('./src/data');

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || undefined;
    const products = await productManager.getProducts(limit);

    res.status(200).send({
      status: 200,
      message: products,
    });
  } catch (error: any) {
    res.status(500).send({
      status: 500,
      message: `Error al obtener los productos: ${error.message}`,
    });
  }
});

router.get('/:pid', async (req, res) => {
  try {
    const productId = parseInt(req.params.pid as string, 10);
    const product = await productManager.getProductById(productId);

    if (!product) {
      return res.status(404).send({
        status: 404,
        message: `Producto no encontrado. No existe un producto con el ID proporcionado.`,
      });
    }

    res.status(200).send({
      status: 200,
      message: product,
    });
  } catch (error: any) {
    res.status(500).send({
      status: 500,
      message: `Error al obtener el producto: ${error.message}`,
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const product = req.body as Product;
    await productManager.addProduct(product);

    res.status(200).send('Producto agregado con éxito.');
  } catch (error: any) {
    if (error.message.includes('Error de validacion')) {
      res.status(400).send({ error: error.message });
    } else if (error.message.includes('Ya existe un producto con el código')) {
      res.status(409).send({ error: error.message });
    } else {
      res.status(500).send({ error: 'Error interno del servidor.' });
    }
  }
});
router.put('/', async (req, res) => {
  try {
  } catch (error: any) {}
});

export default router;
