import { Request, Response } from 'express';

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

export const getCarts = async () => {};

export const getCartById = async () => {};

export const addProductToCart = async () => {};
