// Interfaces
import { Product } from '@interfaces/products.interface';

// Models
import Cart from '@models/cart.model';

// Repositories
import * as CartRepository from '@repositories/cart.repository';

// Services
import { getProductById } from './product.service';

export const createCart = async () => {
  const newCart = new Cart({
    products: [],
  });

  try {
    const cartSave = await CartRepository.saveCart(newCart);
    return { status: 201, data: cartSave };
  } catch (error: any) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

export const getCarts = async (limit: number | undefined) => {
  try {
    const carts = await CartRepository.findCarts(limit);

    if (!carts)
      throw {
        status: 404,
        message: 'No se encontraron carritos.',
      };

    return { status: 200, data: carts };
  } catch (error: any) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

export const getCartById = async (id: string) => {
  const cartId = id;

  try {
    const cart = await CartRepository.findCartById(cartId);

    if (!cart)
      throw {
        status: 404,
        message: 'El carrito no existe.',
      };

    return { status: 200, data: cart };
  } catch (error: any) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

export const addProductToCart = async (cid: string, pid: string) => {
  try {
    // Verificar si el producto existe en la BD
    const dbProduct = await getProductById(pid);
    if (!dbProduct)
      throw {
        status: 404,
        message: 'No existe el producto.',
      };

    // Agregar el producto al carrito
    const updatedCart = await CartRepository.addProductToCart(cid, pid);

    return { status: 200, data: updatedCart };
  } catch (error: any) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

export const removeProductFromCart = async (cid: string, pid: string) => {
  try {
    // Eliminar el producto del carrito
    const updatedCart = await CartRepository.removeProductFromCart(cid, pid);

    return { status: 200, data: updatedCart };
  } catch (error: any) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

export const updateCart = async (cid: string, newProducts: any) => {
  try {
    // Verificar si los productos existen en la BD
    for (let product of newProducts.payload) {
      const pid = product._id;

      const dbProduct = await getProductById(pid);
      if (!dbProduct) throw { status: 404, message: 'No existe el producto.' };
    }

    // Actualizar el carrito
    const updatedCart = await CartRepository.updateCart(cid, newProducts);

    return { status: 200, data: updatedCart };
  } catch (error: any) {}
};

export const updateProductQuantity = async (
  cid: string,
  pid: string,
  quantity: number,
) => {
  try {
    // Actualizar la cantidad del producto en el carrito
    const updatedCart = await CartRepository.updateProductQuantity(
      cid,
      pid,
      quantity,
    );

    return { status: 200, data: updatedCart };
  } catch (error: any) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

export const removeAllProductsFromCart = async (cid: string) => {
  try {
    // Eliminar todos los productos del carrito
    const updatedCart = await CartRepository.removeAllProductsFromCart(cid);

    return { status: 200, data: updatedCart };
  } catch (error: any) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};
