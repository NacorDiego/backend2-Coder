import { Request, Response } from 'express';
import { getProducts, getProductById } from '@services/dao/db/product.service';

export const renderProducts = async (req: Request, res: Response) => {
  try {
    const result = await getProducts();

    const productsList = result.data.docs.map(product => ({
      _id: product._id,
      title: product.title,
      price: product.price,
      stock: product.stock,
    }));

    res.status(result.status).render('home', { products: productsList });
    // .render('home', { products: productsList, user: req.session.user });
  } catch (error: any) {
    res.status(error.status).json({ status: 'FAILED', message: error.message });
  }
};

export const renderEditProductForm = async (req: Request, res: Response) => {
  const pid = req.params.id;
  const { data } = await getProductById(pid);

  const product = {
    _id: data._id,
    title: data.title,
    price: data.price,
    stock: data.stock,
  };

  console.log(product);

  res.render('products/edit-product', { product });
};

export const renderRealTimeProducts = async (req: Request, res: Response) => {};

export const viewRegistrationForm = (req: Request, res: Response) => {
  res.render('users/register');
};

export const viewLoginForm = (req: Request, res: Response) => {
  res.render('users/login');
};

export const viewLoginWithGithub = (req: Request, res: Response) => {
  res.render('users/login-github');
};

export const viewUserProfile = (req: Request, res: Response) => {
  res.render('users/profile');
  // res.render('profile', { user: req.session.user });
};
