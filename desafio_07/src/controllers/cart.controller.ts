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

    res
      .status(updatedCart.status)
      .json({ status: updatedCart.status, data: updatedCart.data });
  } catch (error: any) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

export const updateCart = async (req: Request, res: Response) => {};

export const updateProductQuantity = async (req: Request, res: Response) => {};

export const removeProductFromCart = async (req: Request, res: Response) => {};

export const removeAllProductsFromCart = async (
  req: Request,
  res: Response,
) => {};
