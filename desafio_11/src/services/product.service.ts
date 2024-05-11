import { PaginateResult } from 'mongoose';

// Models
import ProductModel from '@models/product.model';

// Repositories
import * as ProductRepository from '@repositories/product.repository';

export const createProduct = async (
  dataProduct: any,
): Promise<InstanceType<typeof ProductModel> | null> => {
  return await ProductRepository.createProduct(dataProduct);
};

export const getProducts = async (
  limit: number = 10,
  page: number = 1,
  status: boolean | undefined = undefined,
  category: string | undefined = undefined,
  sort: string | undefined = undefined,
): Promise<PaginateResult<InstanceType<typeof ProductModel> | null>> => {
  return await ProductRepository.getProducts(
    limit,
    page,
    status,
    category,
    sort,
  );
};

export const getProductById = async (
  productId: string,
): Promise<InstanceType<typeof ProductModel> | null> => {
  return await ProductRepository.getProductById(productId);
};

export const updateProductById = async (
  productId: string,
  updates: Partial<InstanceType<typeof ProductModel>>,
): Promise<InstanceType<typeof ProductModel> | null> => {
  return await ProductRepository.updateProductById(productId, updates);
};

export const deleteProductById = async (productId: string) => {
  return await ProductRepository.deleteProductById(productId);
};
