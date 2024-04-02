import { Request, Response } from 'express';
import { getProducts } from '@services/dao/db/product.service';

//TODO: Desarrollar controladores
export const renderProducts = async (req: Request, res: Response) => {
  if (!req.session.user)
    res
      .status(400)
      .json({ status: 'FAILED', message: 'No se encontró una sesión válida.' });

  try {
    const result = await getProducts();

    const productsList = result.data.docs.map(product => ({
      title: product.title,
      price: product.price,
      stock: product.stock,
    }));

    console.log(req.session.user);

    res
      .status(result.status)
      .render('home', { products: productsList, user: req.session.user });
  } catch (error: any) {
    res.status(error.status).json({ status: 'FAILED', message: error.message });
  }
};

export const renderRealTimeProducts = async (req: Request, res: Response) => {};

export const viewLoginForm = (req: Request, res: Response) => {
  res.render('login');
};

export const viewRegistrationForm = (req: Request, res: Response) => {
  res.render('register');
};

export const viewUserProfile = (req: Request, res: Response) => {
  res.render('profile', { user: req.session.user });
};
