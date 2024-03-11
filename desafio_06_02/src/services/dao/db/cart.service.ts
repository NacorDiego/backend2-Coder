import Cart from './models/cart.model';

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

//TODO Terminar esta función.
export const addProductToCart = async () => {};
