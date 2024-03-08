import { Request, Response } from 'express';
import { productManager } from '@core/index';
import { Product } from '@interfaces/product.interface';
import { isEmptyObject } from '@services/objectService';
import { socketServer } from 'src/app';

export const getProducts = async (req: Request, res: Response) => {
  try {
    console.log('SE PEGO A LA RUTA GET API/PRODUCTS');

    const limit = req.query.limit
      ? parseInt(req.query.limit as string, 10)
      : undefined;
    const products = await productManager.getProducts(limit);

    res.status(200).send({
      status: 200,
      message: products,
    });
  } catch (error: any) {
    res.status(500).send({
      status: 500,
      message: `${error.message}`,
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
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
      message: `${error.message}`,
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body as Product;

    if (isEmptyObject(product)) {
      return res.status(404).send({
        status: 404,
        message:
          'Error al crear el producto: Deben enviarse los campos requeridos.',
      });
    }

    if (product.id) {
      return res.status(404).send({
        status: 404,
        message:
          'El ID del producto se genera automáticamente y no debe indicarse en la solicitud.',
      });
    }

    const productAdded = await productManager.addProduct(product);

    socketServer.emit('productsUpdated');

    res.status(200).send({ status: 200, message: productAdded });
  } catch (err: any) {
    if (err.message.includes('Error de validacion')) {
      res.status(400).send({ status: 400, message: err.message });
    } else if (err.message.includes('Error al agregar el producto')) {
      res.status(404).send({ status: 404, message: err.message });
    } else if (err.message.includes('Ya existe un producto con el código')) {
      res.status(409).send({ status: 409, message: err.message });
    } else {
      res
        .status(500)
        .send({ status: 500, message: 'Error interno del servidor.' });
    }
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.pid as string, 10);
    const productUpdated = req.body as Partial<Product>;

    if (isEmptyObject(productUpdated)) {
      return res.status(404).send({
        status: 404,
        message:
          'Error al actualizar el producto: Debe enviarse al menos un campo.',
      });
    }

    if (productUpdated.id) {
      return res.status(404).send({
        status: 404,
        message: 'No se puede actualizar el ID de un producto.',
      });
    }

    await productManager.updateProduct(productId, productUpdated);

    res
      .status(200)
      .send({ status: 200, message: 'Producto actualizado con éxito.' });
  } catch (error: any) {
    if (error.message.includes('No se encontro el producto')) {
      res.status(404).send({ status: 404, message: error.message });
    } else {
      res
        .status(500)
        .send({ status: 500, message: 'Error interno del servidor.' });
    }
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.pid as string, 10);
    await productManager.deleteProduct(productId);

    socketServer.emit('productsUpdated');

    res
      .status(200)
      .send({ status: 200, message: 'Producto eliminado con éxito.' });
  } catch (error: any) {
    if (error.message.includes('No se encontro el producto')) {
      res.status(404).send({ status: 404, message: error.message });
    } else {
      res
        .status(500)
        .send({ status: 500, message: 'Error interno del servidor.' });
    }
  }
};
