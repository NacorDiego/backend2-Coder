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
  return await CartDao.saveCart(cart);
};

export const addProductToCart = async (
  cid: string,
  pid: string,
): Promise<InstanceType<typeof CartModel> | null> => {
  // Obtener el carrito
  const cart = await CartDao.findCartById(cid);
  if (!cart) throw { status: 404, message: 'No existe el producto.' };

  // Buscar producto en el carrito
  const productIndex = CartDao.findProductInCart(cart, pid);

  productIndex !== -1
    ? cart.products[productIndex].quantity++
    : cart.products.push({ item: pid, quantity: 1 });

  // Guardar el carrito
  const updatedCart = await CartDao.saveCart(cart);

  return updatedCart;
};
