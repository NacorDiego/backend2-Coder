import { Request, Response } from 'express';

import * as cartService from '@services/cart.service';
import { errorHandler } from '@utils/errors.util';

// Crea un nuevo carrito vacío
export const createCart = async (req: Request, res: Response) => {
  try {
    const result = await cartService.createCart();
    res.status(201).json({ status: 'OK', data: result });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

// Obtiene todos los carritos, opcionalmente limitados por cantidad
export const getCarts = async (req: Request, res: Response) => {
  const limit = req.query.limit
    ? parseInt(req.query.limit as string, 10)
    : undefined;

  try {
    const carts = await cartService.getCarts(limit);

    res.status(200).json({ status: 'OK', data: carts });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

// Obtiene un carrito por su ID
export const getCartById = async (req: Request, res: Response) => {
  const cid = req.params.cid;

  try {
    const result = await cartService.getCartById(cid);

    res.status(200).json({ status: 'OK', data: result });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

// Agrega un producto a un carrito existente
export const addProductToCart = async (req: Request, res: Response) => {
  const pid = req.params.pid;
  const cid = req.params.cid;

  try {
    const result = await cartService.addProductToCart(cid, pid);

    res.status(200).json({ status: 'OK', data: result });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

export const removeProductFromCart = async (req: Request, res: Response) => {
  const { pid, cid } = req.params;
  try {
    const result = await cartService.removeProductFromCart(cid, pid);

    res.status(200).json({ status: 'OK', data: result });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

export const updateCart = async (req: Request, res: Response) => {
  const cid = req.params.cid;
  const newProducts = req.body;
  try {
    const result = await cartService.updateCart(cid, newProducts);

    res.status(200).json({ status: 'OK', data: result });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

export const updateProductQuantity = async (req: Request, res: Response) => {
  const { pid, cid } = req.params;
  const quantity = req.body;
  try {
    const result = await cartService.updateProductQuantity(cid, pid, quantity);

    res.status(200).json({ status: 'OK', data: result });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

export const removeAllProductsFromCart = async (
  req: Request,
  res: Response,
) => {
  const cid = req.params.cid;
  try {
    const result = await cartService.removeAllProductsFromCart(cid);

    res.status(200).json({ status: 'OK', data: result });
  } catch (error: any) {
    errorHandler(error, res);
  }
};
