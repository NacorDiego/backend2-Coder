// Models
import CartModel from '@models/cart.model';

export const saveCart = async (
  cart: InstanceType<typeof CartModel>,
): Promise<InstanceType<typeof CartModel>> => {
  return await cart.save();
};

export const findCarts = async (
  limit: number | undefined,
): Promise<InstanceType<typeof CartModel>[] | null> => {
  if (limit !== undefined && limit >= 0) {
    return await CartModel.find().limit(limit);
  } else {
    return await CartModel.find();
  }
};

export const findCartById = async (
  id: string,
): Promise<InstanceType<typeof CartModel> | null> => {
  return await CartModel.findById(id).populate('products.item');
};

export const findProductInCart = (
  cart: InstanceType<typeof CartModel>,
  pid: string,
): number => {
  return cart.products?.findIndex(product => product.item.toString() === pid);
};
