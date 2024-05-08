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
    const cart = await Cart.findById(cartId).populate('products.item');

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

    // Obtener el carrito
    const cart = await Cart.findById(cid);
    if (!cart)
      throw {
        status: 404,
        message: 'No existe el carrito.',
      };

    // Buscar producto en el carrito
    const productIndex = cart.products?.findIndex(
      product => product.item.toString() === pid,
    );

    productIndex !== -1
      ? cart.products[productIndex].quantity++
      : cart.products.push({ item: pid, quantity: 1 });

    const updatedCart = await cart.save();

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
    // Obtener carrito
    const cart = await Cart.findById(cid);
    if (!cart)
      throw {
        status: 404,
        message: 'No existe el carrito.',
      };
    // Buscar producto en el carrito
    const productIndex = cart.products?.findIndex(
      product => product.item.toString() === pid,
    );
    if (productIndex === -1)
      throw {
        status: 404,
        message: 'El producto no está en el carrito.',
      };
    // Eliminar el producto del carrito
    cart.products.splice(productIndex, 1);
    const updatedCart = await cart.save();
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
    // Verificar si el carrito existe
    const cart = await Cart.findById(cid);
    if (!cart)
      throw {
        status: 404,
        message: 'No existe el carrito.',
      };
    // Verificar si los productos existen en la BD
    for (let product of newProducts.payload) {
      const pid = product._id;

      const dbProduct = await getProductById(pid);
      if (!dbProduct)
        throw {
          status: 404,
          message: 'No existe el producto.',
        };
    }
    // Actualizar los productos del carrito
    cart.products = newProducts.payload.map((product: Product) => ({
      item: product.id,
      quantity: 1,
    }));

    const updatedCart = await cart.save();
    return { status: 200, data: updatedCart };
  } catch (error: any) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

export const updateProductQuantity = async (
  cid: string,
  pid: string,
  quantity: number,
) => {
  try {
    // Buscar el carrito por ID
    const cart = await Cart.findById(cid);
    if (!cart)
      throw {
        status: 404,
        message: 'No existe el carrito.',
      };

    // Buscar el producto en el carrito
    const productIndex = cart.products.findIndex(
      product => product.item.toString() === pid,
    );
    if (productIndex === -1)
      throw {
        status: 404,
        message: 'Producto no encontrado en el carrito.',
      };
    // Actualizar la cantidad del producto
    cart.products[productIndex].quantity = quantity;
    // Guardar el carrito actualizado
    const updatedCart = await cart.save();
    return {
      status: 200,
      data: updatedCart,
    };
  } catch (error: any) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};

export const removeAllProductsFromCart = async (cartid: string) => {
  try {
    // Buscar el carrito por ID
    const cart = await Cart.findById(cartid);
    if (!cart)
      throw {
        status: 404,
        message: 'No existe el carrito.',
      };

    // Vaciar lista de productos del carrito
    cart.products = [] as any;

    // Guardar el carrito actualizado
    const updatedCart = await cart.save();
    return {
      status: 200,
      data: updatedCart,
    };
  } catch (error: any) {
    throw {
      status: error?.status || 500,
      message: error?.message || error,
    };
  }
};
