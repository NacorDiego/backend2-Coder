// Models
import Cart from '@models/cart.model';

// Repositories
import * as CartRepository from '@repositories/cart.repository';

// Services
import { getProductById } from './product.service';
import CartModel from '@models/cart.model';
import { NotFoundError } from '@utils/errors.util';

export const createCart = async (): Promise<InstanceType<
  typeof CartModel
> | null> => {
  const newCart = new Cart({
    products: [],
  });

  const cartSave = await CartRepository.saveCart(newCart);
  return cartSave;
};

export const getCarts = async (
  limit: number | undefined,
): Promise<InstanceType<typeof CartModel>[] | null> => {
  const carts = await CartRepository.findCarts(limit);
  return carts;
};

export const getCartById = async (
  id: string,
): Promise<InstanceType<typeof CartModel> | null> => {
  const cartId = id;
  const cart = await CartRepository.findCartById(cartId);

  return cart;
};

export const addProductToCart = async (
  cid: string,
  pid: string,
): Promise<InstanceType<typeof CartModel> | null> => {
  // Verificar si el producto existe en la BD
  const dbProduct = await getProductById(pid);
  if (!dbProduct) throw new NotFoundError('No existe el producto.');

  // Agregar el producto al carrito
  const updatedCart = await CartRepository.addProductToCart(cid, pid);

  return updatedCart;
};

export const removeProductFromCart = async (
  cid: string,
  pid: string,
): Promise<InstanceType<typeof CartModel> | null> => {
  // Eliminar el producto del carrito
  const updatedCart = await CartRepository.removeProductFromCart(cid, pid);

  return updatedCart;
};

export const updateCart = async (
  cid: string,
  newProducts: any,
): Promise<InstanceType<typeof CartModel> | null> => {
  // Verificar si los productos existen en la BD
  for (let product of newProducts.payload) {
    const pid = product._id;

    const dbProduct = await getProductById(pid);
    if (!dbProduct) throw new NotFoundError('No existe el producto.');
  }

  // Actualizar el carrito
  const updatedCart = await CartRepository.updateCart(cid, newProducts);

  return updatedCart;
};

export const updateProductQuantity = async (
  cid: string,
  pid: string,
  quantity: number,
): Promise<InstanceType<typeof CartModel> | null> => {
  // Actualizar la cantidad del producto en el carrito
  const updatedCart = await CartRepository.updateProductQuantity(
    cid,
    pid,
    quantity,
  );

  return updatedCart;
};

export const removeAllProductsFromCart = async (
  cid: string,
): Promise<InstanceType<typeof CartModel> | null> => {
  // Eliminar todos los productos del carrito
  const updatedCart = await CartRepository.removeAllProductsFromCart(cid);

  return updatedCart;
};
