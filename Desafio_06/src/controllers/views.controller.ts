import { Request, Response } from 'express';
import { productManager } from '@core/index';

export const renderProducts = async (req: Request, res: Response) => {
  try {
    const products = await productManager.getProducts(undefined);

    res.status(200).render('home', { products });
  } catch (err: any) {
    res.status(500).send({
      status: 500,
      message: `${err.message}`,
    });
  }
};

export const renderRealTimeProducts = async (req: Request, res: Response) => {
  try {
    res.render('realTimeProducts', {});
  } catch (err: any) {
    res.status(500).send({
      status: 500,
      message: `${err.message}`,
    });
  }
};
