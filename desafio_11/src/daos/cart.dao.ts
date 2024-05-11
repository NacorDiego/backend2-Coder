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

export const findCartAndSave = async (
  cart: InstanceType<typeof CartModel>,
): Promise<InstanceType<typeof CartModel> | null> => {
  return await CartModel.findById(cart._id).populate('products.item');
};

export const findProductInCart = (
  cart: InstanceType<typeof CartModel>,
  pid: string,
): number => {
  return cart.products?.findIndex(product => product.item.toString() === pid);
};

export const removeProductFromCart = (
  cart: InstanceType<typeof CartModel>,
  productIndex: number,
): void => {
  cart.products.slice(productIndex, 1);
};

export const updateProductQuantityInCart = (
  cart: InstanceType<typeof CartModel>,
  productIndex: number,
  quantity: number,
): void => {
  cart.products[productIndex].quantity = quantity;
};

export const removeAllProductsFromCart = (
  cart: InstanceType<typeof CartModel>,
): void => {
  cart.products = [] as any;
};
