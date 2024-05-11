import { PaginateOptions, PaginateResult } from 'mongoose';

// Models
import ProductModel from '@models/product.model';

// Errors
import { NotFoundError } from '@utils/errors.util';

export const saveProduct = async (
  product: InstanceType<typeof ProductModel>,
): Promise<InstanceType<typeof ProductModel> | null> => {
  return await product.save();
};

export const getProductsWithPagination = async (
  query: any,
  options: PaginateOptions,
): Promise<PaginateResult<InstanceType<typeof ProductModel> | null>> => {
  const products = await ProductModel.paginate(query, options);
  if (!products) {
    throw new NotFoundError('No se encontraron productos.');
  }
  return products;
};

export const getProductById = async (
  productId: string,
): Promise<InstanceType<typeof ProductModel> | null> => {
  const product = await ProductModel.findById(productId);
  if (!product) throw new NotFoundError('El producto no existe.');

  return product;
};

export const updateProductById = async (
  productId: string,
  updates: Partial<InstanceType<typeof ProductModel>>,
): Promise<InstanceType<typeof ProductModel> | null> => {
  const updatedProduct = await ProductModel.findByIdAndUpdate(
    productId,
    updates,
    { new: true },
  );
  if (!updatedProduct)
    throw new NotFoundError('No se encontró el producto para actualizar');

  return updatedProduct;
};

export const deleteProduct = async (
  productId: string,
): Promise<void | null> => {
  return await ProductModel.findByIdAndDelete(productId);
};
