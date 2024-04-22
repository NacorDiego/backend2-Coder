import { Request, Response } from 'express';
import * as productService from '../services/dao/db/product.service';
// import * as productService from '../services/dao/filesystem/product.service';

export const createProduct = async (req: Request, res: Response) => {
  const dataProduct = req.body;
  try {
    const result = await productService.createProduct(dataProduct);
    // req.flash('success_msg', 'Producto agregado con éxito!');
    res.cookie('success_msg', '¡Producto agregado con éxito!');
    res.status(result.status).json({ status: 'OK', data: result.data });
  } catch (error: any) {
    res.status(error.status).json({ status: 'FAILED', message: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  // limit
  const limit =
    typeof req.query.limit === 'string' ? parseInt(req.query.limit) : 10;
  // page
  const page =
    typeof req.query.page === 'string' ? parseInt(req.query.page) : 1;
  // category
  const category =
    typeof req.query.category === 'string' ? req.query.category : undefined;
  // sort
  const sort = typeof req.query.sort === 'string' ? req.query.sort : undefined;
  // status
  let queryStatus = req.query.status;
  let status: boolean | undefined;
  if (queryStatus !== undefined) {
    status = req.query.status === 'true';
  } else {
    status = undefined;
  }

  try {
    const result = await productService.getProducts(
      limit,
      page,
      status,
      category,
      sort,
    );

    return res.status(result.status).json({
      status: 'OK',
      payload: result.data.docs,
      totalPages: result.data.totalPages,
      prevPage: result.data.prevPage,
      nextPage: result.data.nextPage,
      page: result.data.page,
      hasPrevPage: result.data.hasPrevPage,
      hasNextPage: result.data.hasNextPage,
      prevLink:
        result.data.hasPrevPage && result.data.page
          ? `${req.protocol}://${req.get('host')}${
              req.originalUrl.split('?')[0]
            }?page=${result.data.page - 1}`
          : null,
      nextLink:
        result.data.hasNextPage && result.data.page
          ? `${req.protocol}://${req.get('host')}${
              req.originalUrl.split('?')[0]
            }?page=${result.data.page + 1}`
          : null,
    });
  } catch (error: any) {
    res.status(error.status).json({ status: 'FAILED', message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const pId = req.params.pid;
  try {
    const product = await productService.getProductById(pId);
    return res
      .status(product.status)
      .json({ status: 'OK', data: product.data });
  } catch (error: any) {
    return res
      .status(error.status)
      .json({ status: 'FAILED', message: error.message });
  }
};

export const updateProductById = async (req: Request, res: Response) => {
  const pId = req.params.pid;
  const updates = req.body;
  try {
    const result = await productService.updateProductById(pId, updates);
    res.cookie('success_msg', 'Producto actualizado con éxito!');
    return res.status(result.status).redirect('/');
  } catch (error: any) {
    res.status(error.status).json({ status: 'FAILED', message: error.message });
  }
};

export const deleteProductById = async (req: Request, res: Response) => {
  const pid = req.params.pid;
  try {
    const result = await productService.deleteProductById(pid);
    res.cookie('success_msg', 'Producto eliminado con éxito!');
    res.status(result.status).redirect('/');
  } catch (error: any) {
    res.status(error.status).json({ status: 'FAILED', message: error.message });
  }
};
