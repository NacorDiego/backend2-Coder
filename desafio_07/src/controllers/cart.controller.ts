import { Request, Response } from 'express';
import * as cartService from '../services/dao/db/cart.service';

// Crea un nuevo carrito vacío
export const createCart = async (req: Request, res: Response) => {
  try {
    const addedCart = await cartService.createCart();
    res
      .status(addedCart.status)
      .json({ status: addedCart.status, data: addedCart.data });
  } catch (error: any) {
    res.status(500).send({
      status: 500,
      message: error.message,
    });
  }
};

// Obtiene todos los carritos, opcionalmente limitados por cantidad
export const getCarts = async (req: Request, res: Response) => {
  const limit = req.query.limit
    ? parseInt(req.query.limit as string, 10)
    : undefined;

  try {
    const carts = await cartService.getCarts(limit);

    res.status(carts.status).json({ status: carts.status, data: carts.data });
  } catch (error: any) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

// Obtiene un carrito por su ID
export const getCartById = async (req: Request, res: Response) => {
  const cid = req.params.cid;

  try {
    const cart = await cartService.getCartById(cid);

    res.status(cart.status).json({ status: cart.status, data: cart.data });
  } catch (error: any) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

// Agrega un producto a un carrito existente
export const addProductToCart = async (req: Request, res: Response) => {
  const pid = req.params.pid;
  const cid = req.params.cid;

  try {
    const updatedCart = await cartService.addProductToCart(cid, pid);
    if (!updatedCart)
      throw new Error('No se pudo agregar el producto al carrito.');

    res
      .status(updatedCart.status)
      .json({ status: updatedCart.status, data: updatedCart.data });
  } catch (error: any) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
export const removeProductFromCart = async (req: Request, res: Response) => {
  const { pid, cid } = req.params;

  try {
    const result = await cartService.removeProductFromCart(cid, pid);
    if (!result)
      throw new Error('No se pudo eliminar el producto del carrito.');
    res.status(200).json({ status: 200, data: result });
  } catch (error: any) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  const cid = req.params.cid;
  const newProducts = req.body;

  try {
    const result = await cartService.updateCart(cid, newProducts);
    if (!result)
      throw new Error(
        'No se pudo actualizar la lista de productos en el carrito.',
      );
    res.status(200).json({ status: 200, data: result });
  } catch (error: any) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

export const updateProductQuantity = async (req: Request, res: Response) => {
  const { pid, cid } = req.params;
  const quantity = req.body;

  try {
    const result = await cartService.updateProductQuantity(cid, pid, quantity);
    if (!result)
      throw new Error('Error al actualizar la cantidad del producto.');
    res.status(200).json({ status: 200, data: result });
  } catch (error: any) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

export const removeAllProductsFromCart = async (
  req: Request,
  res: Response,
) => {
  const cid = req.params.cid;

  try {
    const result = await cartService.removeAllProductsFromCart(cid);
    if (!result)
      throw new Error('No se pudieron eliminar los productos del carrito.');
    res.status(204).json({ status: 204 });
  } catch (error: any) {
    res.status(500).json({ status: 500, message: error.message });
  }
};
