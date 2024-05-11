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

export const removeProductFromCart = async (
  cid: string,
  pid: string,
): Promise<InstanceType<typeof CartModel> | null> => {
  // Obtener el carrito
  const cart = await CartDao.findCartById(cid);
  if (!cart) throw { status: 404, message: 'No existe el carrito.' };

  // Buscar producto en el carrito
  const productIndex = CartDao.findProductInCart(cart, pid);
  if (productIndex === -1)
    throw { status: 404, message: 'El producto no está en el carrito' };

  // Eliminar el producto del carrito
  CartDao.removeProductFromCart(cart, productIndex);

  // Guardar el carrito
  const updatedCart = await CartDao.saveCart(cart);

  return updatedCart;
};

export const updateCart = async (
  cid: string,
  newProducts: any,
): Promise<InstanceType<typeof CartModel> | null> => {
  // Obtener el carrito
  const cart = await CartDao.findCartById(cid);
  if (!cart) throw { status: 404, message: 'No existe el carrito.' };

  // Actualizar los productos del carrito
  cart.products = newProducts.payload.map((product: any) => ({
    item: product._id,
    quantity: product.quantity || 1,
  }));

  // Guardar el carrito
  const updatedCart = await CartDao.saveCart(cart);

  return updatedCart;
};

export const updateProductQuantity = async (
  cid: string,
  pid: string,
  quantity: number,
): Promise<InstanceType<typeof CartModel> | null> => {
  const cart = await CartDao.findCartById(cid);
  if (!cart) throw { status: 404, message: 'No existe el carrito.' };

  // Buscar producto en el carrito
  const productIndex = CartDao.findProductInCart(cart, pid);
  if (productIndex === -1)
    throw { status: 404, message: 'Producto no encontrado en el carrito.' };

  // Actualizar la cantidad del producto
  CartDao.updateProductQuantityInCart(cart, productIndex, quantity);

  // Guardar el carrito
  const updatedCart = await CartDao.saveCart(cart);

  return updatedCart;
};

export const removeAllProductsFromCart = async (
  cid: string,
): Promise<InstanceType<typeof CartModel> | null> => {
  // Obtener el carrito
  const cart = await CartDao.findCartById(cid);
  if (!cart) throw { status: 404, message: 'No existe el carrito.' };

  // Vaciar el carrito
  CartDao.removeAllProductsFromCart(cart);

  // Guardar el carrito
  const updatedCart = await CartDao.saveCart(cart);

  return updatedCart;
};
