import { Request, Response } from 'express';
import { cartManager } from '@core/index';
import { productManager } from '@core/index';

/**
 * Obtiene todos los carritos.
 *
 * @param req El objeto de solicitud (Request).
 * @param res El objeto de respuesta (Response).
 * @returns Una respuesta con el estado 200 y la lista de carritos.
 * En caso de error, devuelve una respuesta con el estado 500 y un mensaje de error.
 */
export const getCarts = async (req: Request, res: Response) => {
  try {
    const carts = await cartManager.getCarts();
    res.status(200).send({
      status: 200,
      message: carts,
    });
  } catch (err: any) {
    res.status(500).send(`Error: ${err.message}`);
  }
};

/**
 * Obtiene un carrito por su ID.
 *
 * @param req El objeto de solicitud (Request).
 * @param res El objeto de respuesta (Response).
 * @returns Una respuesta con el estado 200 y el carrito correspondiente al ID proporcionado.
 * Si no se encuentra el carrito, devuelve una respuesta con el estado 404 y un mensaje de error.
 * En caso de error, devuelve una respuesta con el estado 500 y un mensaje de error.
 */
export const getCartById = async (req: Request, res: Response) => {
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
};

/**
 * Crea un nuevo carrito.
 *
 * @param req El objeto de solicitud (Request).
 * @param res El objeto de respuesta (Response).
 * @returns Una respuesta con el estado 200 y el carrito recién creado.
 * En caso de error, devuelve una respuesta con el estado 500 y un mensaje de error.
 */
export const createCart = async (req: Request, res: Response) => {
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
};

/**
 * Agrega un producto a un carrito.
 *
 * @param req El objeto de solicitud (Request).
 * @param res El objeto de respuesta (Response).
 * @returns Una respuesta con el estado 200 y el carrito actualizado con el producto agregado.
 * Si no se encuentra el producto, devuelve una respuesta con el estado 404 y un mensaje de error.
 * En caso de error, devuelve una respuesta con el estado 500 y un mensaje de error.
 */
export const addProductToCart = async (req: Request, res: Response) => {
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
};
