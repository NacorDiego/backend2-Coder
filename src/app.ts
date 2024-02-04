import express from 'express';
import { ProductManager } from '@core/ProductManager';

const app = express();
const PORT = 3000;
const productManager = new ProductManager('./src/data');

// Endpoints
app.get('/products', async (req, res) => {
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

app.get('/products/:pid', async (req, res) => {
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

// Manejo de errores

// Ruta para manejar errores 404 (ruta no encontrada)
app.use((req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Ruta no encontrada',
  });
});

// Manejador de errores global que captura cualquier error que no esté contemplado antes.
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).send({
    status: 500,
    message: 'Error interno del servidor',
  });
});

app.listen(PORT, () => console.log(`The server is listening on port ${PORT}.`));
