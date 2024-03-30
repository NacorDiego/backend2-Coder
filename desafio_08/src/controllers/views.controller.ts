import { Request, Response } from 'express';
import { getProducts } from '@services/dao/db/product.service';

//TODO: Desarrollar controladores
export const renderProducts = async (req: Request, res: Response) => {
  try {
    const result = await getProducts(10, 1, undefined, undefined, undefined);
    console.log('Primer producto:', result.data.docs[0]);
    res.status(result.status).render('home', { products: result.data.docs });
  } catch (error: any) {
    res.status(error.status).json({ status: 'FAILED', message: error.message });
  }
};
export const renderRealTimeProducts = async (req: Request, res: Response) => {};
