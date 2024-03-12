import path from 'path';
import { Cart } from '@interfaces/cart.interface';
import * as fs from '@services/fileSystem.services';
import { getProductById } from '@services/dao/filesystem/product.service';

const route: string = __dirname + '/data';
const filename: string = path.join(route, 'carts.json');
let carts: Cart[] = [];
let idSig: number = 1;

export const createCart = async () => {
  const cart = {
    id: idSig.toString(),
    products: [],
  };
  idSig++;
  carts.push(cart);
  try {
    await fs.writeFile(filename, carts);
    return { status: 201, data: carts };
  } catch (error: any) {
    throw new Error('Error al crear un nuevo carrito.');
  }
};

export const getCarts = async (limit: number) => {
  try {
    carts = await fs.readFile(filename);

    limit !== undefined
      ? { status: 200, data: carts.slice(0, limit) }
      : { status: 200, data: carts };
  } catch (error: any) {
    throw new Error(`Error al obtener los carritos: ${error.message}`);
  }
};

export const getCartById = async (cid: string) => {
  try {
    carts = await fs.readFile(filename);

    const cart = carts.find(cart => cart.id === cid);

    if (!cart) throw new Error('No existe el carrito.');

    return { status: 200, data: cart };
  } catch (error: any) {
    throw new Error(`Error al obtener el carrito: ${error.message}`);
  }
};

export const addProductToCart = async (cid: string, pid: string) => {
  try {
    const product = await getProductById(pid);

    if (!product)
      throw new Error('No existe el producto que se quiere agregar.');

    carts = await fs.readFile(filename);

    const cartIndex = carts.findIndex(cart => cart.id === cid);

    if (cartIndex === -1) throw new Error('No existe un carrito con ese ID.');

    let productIndex = carts[cartIndex].products.findIndex(
      product => product.id === pid,
    );

    if (productIndex === -1) {
      const product = {
        id: pid,
        quantity: 1,
      };
      carts[cartIndex].products.push(product);
    } else {
      carts[cartIndex].products[productIndex].quantity++;
    }

    await fs.writeFile(filename, carts);
  } catch (error: any) {
    throw new Error(
      `Error al agregar el producto al carrito: ${error.message}`,
    );
  }
};
