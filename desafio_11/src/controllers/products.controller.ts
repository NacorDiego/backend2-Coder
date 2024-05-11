import { Request, Response } from 'express';

// Errors
import {
  ConnectionError,
  NotFoundError,
  ValidationError,
} from '@utils/errors.util';

// Services
import * as ProductService from '@services/product.service';
import productModel from '@models/product.model';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await ProductService.createProduct(req.body);
    res.status(201).json({ status: 'OK', data: product });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const limit =
      typeof req.query.limit === 'string'
        ? parseInt(req.query.limit)
        : undefined;
    const page =
      typeof req.query.page === 'string' ? parseInt(req.query.page) : undefined;
    const status =
      typeof req.query.status === 'string'
        ? req.query.status === 'true'
        : undefined;
    const category =
      typeof req.query.category === 'string' ? req.query.category : undefined;
    const sort =
      typeof req.query.sort === 'string' ? req.query.sort : undefined;

    const products = await ProductService.getProducts(
      limit,
      page,
      status,
      category,
      sort,
    );

    res.status(200).json({ status: 'OK', data: products });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await ProductService.getProductById(id);

    res.status(200).json({ status: 'OK', data: product });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates: Partial<InstanceType<typeof productModel>> = req.body;

    const updatedProduct = await ProductService.updateProductById(id, updates);

    res.status(200).json({ status: 'OK', data: updatedProduct });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await ProductService.deleteProductById(id);

    res.status(200).json({ message: 'Producto eliminado con éxito.' });
  } catch (error: any) {
    errorHandler(error, res);
  }
};

const errorHandler = (error: any, res: Response) => {
  if (error instanceof NotFoundError)
    res.status(404).json({ status: 'FAILED', message: error.message });
  else if (error instanceof ValidationError)
    res.status(400).json({ status: 'FAILED', message: error.message });
  else if (error instanceof ConnectionError)
    res.status(500).json({ status: 'FAILED', message: error.message });
  else
    res
      .status(500)
      .json({ status: 'FAILED', message: 'Error interno del servidor.' });
};
