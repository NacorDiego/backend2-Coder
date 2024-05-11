import { PaginateOptions, PaginateResult } from 'mongoose';

// Daos
import * as ProductDao from '@daos/product.dao';

// Errors
import { ValidationError } from '@utils/errors.util';

// Models
import ProductModel from '@models/product.model';

interface IQuery {
  status?: boolean;
  category?: string;
}

export const createProduct = async (
  dataProduct: any,
): Promise<InstanceType<typeof ProductModel> | null> => {
  const newProduct = new ProductModel(dataProduct);
  return await ProductDao.saveProduct(newProduct);
};

export const getProducts = async (
  limit: number,
  page: number,
  status: boolean | undefined,
  category: string | undefined,
  sort: string | undefined,
): Promise<PaginateResult<InstanceType<typeof ProductModel> | null>> => {
  // Query
  let query: IQuery = {
    status: undefined,
    category: undefined,
  };
  if (status !== undefined) query.status = status;
  if (category !== undefined) query.category = category;

  // Options
  const options: PaginateOptions = {
    limit,
    page,
    sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
  };

  // Validations
  if (limit < 0 || page < 0)
    throw new ValidationError('Limit y page deben ser números positivos.');

  return await ProductDao.getProductsWithPagination(query, options);
};

export const getProductById = async (
  productId: string,
): Promise<InstanceType<typeof ProductModel> | null> => {
  // Validations
  if (!productId) throw new ValidationError('El ID del producto es requerido.');

  return await ProductDao.getProductById(productId);
};

export const updateProductById = async (
  productId: string,
  updates: Partial<InstanceType<typeof ProductModel>>,
): Promise<InstanceType<typeof ProductModel> | null> => {
  // Validations
  if (!productId) throw new ValidationError('El ID del producto es requerido.');

  return await ProductDao.updateProductById(productId, updates);
};

export const deleteProductById = async (
  productId: string,
): Promise<void | null> => {
  return await ProductDao.deleteProduct(productId);
};
