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
    if (dbProduct.status !== 200)
      throw new Error('No existe ese producto en la base de datos.');

    // Obtener el carrito
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error('No existe el carrito.');

    // Buscar producto en el carrito
    const productIndex = cart.products.findIndex(product => product.id === pid);

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
