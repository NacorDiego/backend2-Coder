import { Request, Response } from 'express';

// Services
import * as ProductService from '@services/product.service';
import { NotFoundError, errorHandler } from '@utils/errors.util';

export const renderProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getProducts();

    // Filtrar "product" que no sean null y luego mapear
    const productsList = result.docs
      .filter(
        (product): product is NonNullable<typeof product> => product !== null,
      )
      .map(product => ({
        _id: product._id,
        title: product.title,
        price: product.price,
        stock: product.stock,
      }));

    res.status(200).render('home', { products: productsList, user: req.user });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

export const renderEditProductForm = async (req: Request, res: Response) => {
  try {
    const pid = req.params.id;
    const result = await ProductService.getProductById(pid);

    if (!result) throw new NotFoundError('El producto no existe.');

    const product = {
      _id: result._id,
      title: result.title,
      price: result.price,
      stock: result.stock,
    };

    res.render('products/edit-product', { product });
  } catch (error: any) {
    errorHandler(error, res);
  }
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
  res.render('users/profile', { user: req.user });
};

export const viewsRecoverPassword = (req: Request, res: Response) => {
  res
    .status(200)
    .render('users/update-data', { pathEndpoint: 'recover-password' });
};
