// Daos
import * as CartDao from '@daos/cart.dao';

// Models
import CartModel from '@models/cart.model';

export const saveCart = async (
  cart: InstanceType<typeof CartModel>,
): Promise<InstanceType<typeof CartModel>> => {
  return await CartDao.saveCart(cart);
};

export const findCarts = async (
  limit: number | undefined,
): Promise<InstanceType<typeof CartModel>[] | null> => {
  return await CartDao.findCarts(limit);
};

export const findCartById = async (
  id: string,
): Promise<InstanceType<typeof CartModel> | null> => {
  return await CartDao.findCartById(id);
};

export const findCartAndSave = async (
  cart: InstanceType<typeof CartModel>,
): Promise<InstanceType<typeof CartModel> | null> => {
  return await CartDao.findCartAndSave(cart);
};
