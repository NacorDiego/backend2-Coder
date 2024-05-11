import CartModel from '@models/cart.model';
import ProductModel from '@models/product.model';

export const saveProduct = async (
  product: InstanceType<typeof ProductModel>,
): Promise<InstanceType<typeof ProductModel> | null> => {
  return await product.save();
};

export const findProducts = async (
  limit: number | undefined,
): Promise<InstanceType<typeof ProductModel>[] | null> => {
  if (limit !== undefined && limit >= 0)
    return await ProductModel.find().limit(limit);
  else return await ProductModel.find();
};

export const findProductById = async (
  id: string,
): Promise<InstanceType<typeof ProductModel> | null> => {
  return await ProductModel.findById(id);
};
