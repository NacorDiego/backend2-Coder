import Cart from './models/cart.model';
import { getProductById } from './product.service';

// Crea un nuevo carrito vacío
export const createCart = async () => {
  const newCart = new Cart({
    products: [],
  });

  try {
    const cartSave = await newCart.save();
    return { status: 201, data: cartSave };
  } catch (error: any) {
    throw new Error(`Error al agregar el carrito: ${error.message}`);
  }
};

// Obtiene todos los carritos, opcionalmente limitados por cantidad
export const getCarts = async (limit: number | undefined) => {
  let carts;

  try {
    if (limit !== undefined && limit >= 0) {
      carts = await Cart.find().limit(limit);
    } else {
      carts = await Cart.find();
    }

    if (!carts) throw new Error('No se encontraron carritos.');

    return { status: 200, data: carts };
  } catch (error: any) {
    throw new Error(`Error al obtener los carritos: ${error.message}`);
  }
};

// Obtiene un carrito por su ID
export const getCartById = async (id: string) => {
  const cartId = id;

  try {
    const cart = await Cart.findById(cartId);

    if (!cart) throw new Error('El carrito no existe.');

    return { status: 200, data: cart };
  } catch (error: any) {
    throw new Error(`Error al obtener el carrito: ${error.message}`);
  }
};

// Agrega un producto a un carrito existente
export const addProductToCart = async (cid: string, pid: string) => {
  try {
    // Verificar si el producto existe en la BD
    const dbProduct = await getProductById(pid);
    if (!dbProduct)
      throw new Error('No existe ese producto en la base de datos.');

    // Obtener el carrito
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('No existe el carrito.');

    // Buscar producto en el carrito
    const productIndex = cart.products?.findIndex(
      product => product.id === pid,
    );

    productIndex !== -1
      ? cart.products[productIndex].quantity++
      : cart.products.push({ pid });

    const updatedCart = await cart.save();

    return { status: 200, data: updatedCart };
  } catch (error: any) {
    throw new Error(
      `Error al agregar el producto al carrito: ${error.message}`,
    );
  }
};

export const removeProductFromCart = async (cid: string, pid: string) => {
  try {
    // Obtener carrito
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('No existe el carrito.');

    // Buscar producto en el carrito
    const productIndex = cart.products?.findIndex(
      product => product.item.toString() === pid,
    );

    if (productIndex === -1)
      throw new Error('El producto no está en el carrito.');

    // Eliminar el producto del carrito
    cart.products.splice(productIndex, 1);

    const updatedCart = await cart.save();

    return { status: 200, data: updatedCart };
  } catch (error: any) {
    throw new Error(
      `Error al eliminar el producto del carrito: ${error.message}`,
    );
  }
};

export const updateCart = async (cid: string, newProducts: any) => {
  try {
    // Verificar si el carrito existe
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('No existe el carrito.');

    // Verificar si los productos existen en la BD
    for (let product of newProducts.payload) {
      const dbProduct = await getProductById(product.id);
      if (!dbProduct)
        throw new Error(
          `No existe el producto con id ${product.id} en la base de datos.`,
        );
    }

    // Actualizar los productos del carrito
    cart.products = newProducts.payload.map(product => ({
      item: product._id,
      quantity: product.quantity,
    }));

    const updatedCart = await cart.save();

    return { status: 200, data: updatedCart };
  } catch (error: any) {
    throw new Error(
      `Error al actualizar los productos del carrito: ${error.message}`,
    );
  }
};

import { Types } from 'mongoose';

export const updateProductQuantity = async (
  cid: string,
  pid: string,
  quantity: number,
) => {
  try {
    // Buscar el carrito por ID
    const cart = await Cart.findById(cid);
    if (!cart) {
      return {
        status: 'error',
        message: 'Carrito no encontrado',
      };
    }

    // Buscar el producto en el carrito
    const productIndex = cart.products.findIndex(
      product => product.item.toString() === pid,
    );
    if (productIndex === -1) {
      return {
        status: 'error',
        message: 'Producto no encontrado en el carrito',
      };
    }

    // Actualizar la cantidad del producto
    cart.products[productIndex].quantity = quantity;

    // Guardar el carrito actualizado
    const updatedCart = await cart.save();

    return {
      status: 'success',
      payload: updatedCart,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'Error al actualizar la cantidad del producto',
    };
  }
};

export const removeAllProductsFromCart = async (cartid: string) => {
  try {
    // Buscar el carrito por ID
    const cart = await Cart.findById(cartid);
    if (!cart) {
      return {
        status: 'error',
        message: 'Carrito no encontrado',
      };
    }

    // Eliminar todos los productos del carrito
    cart.products = [];

    // Guardar el carrito actualizado
    const updatedCart = await cart.save();

    return {
      status: 'success',
      payload: updatedCart,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 'error',
      message: 'Error al eliminar los productos del carrito',
    };
  }
};
