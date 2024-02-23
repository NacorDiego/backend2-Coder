import { Cart } from '@interfaces/cart.interface';
import path from 'path';
import {
  createDirectory,
  createFile,
  readFile,
  writeFile,
} from '@services/fileSystemService';

export class CartManager {
  private carts: Cart[] = [];
  private path!: string;
  private filename!: string;
  private idSig: number = 1;

  constructor(route: string) {
    this.path = route;
    this.filename = path.join(this.path, 'carts.json');
    createDirectory(this.path);
    createFile(this.filename, '[]');
  }

  public async createCart(): Promise<Cart> {
    try {
      const cart = {
        id: this.idSig++,
        products: [],
      };
      this.carts.push(cart);
      await writeFile(this.filename, this.carts);

      return cart;
    } catch (err: any) {
      throw new Error('Error al crear un nuevo carrito.');
    }
  }
  public async getCarts(): Promise<Cart[]> {
    try {
      const jsonCarts = await readFile(this.filename);
      return jsonCarts as Cart[];
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  public async getCartById(id: number): Promise<Cart | undefined> {
    try {
      this.carts = await readFile(this.filename);
      const cart = this.carts.find(elem => elem.id === id);
      return cart;
    } catch (err: any) {
      throw new Error(`Error al traer el carrito: ${err.message}`);
    }
  }

  public async addProductToCart(cid: number, pid: number): Promise<Cart> {
    try {
      this.carts = await readFile(this.filename);
      const cartIndex = this.carts.findIndex(elem => elem.id === cid);
      if (cartIndex === -1) {
        throw new Error('No existe un carrito con ese ID.');
      }
      let productIndex = this.carts[cartIndex].products.findIndex(
        product => product.id === pid,
      );
      if (productIndex !== -1) {
        this.carts[cartIndex].products[productIndex].quantity++;
      } else {
        const product = {
          id: pid,
          quantity: 1,
        };
        this.carts[cartIndex].products.push(product);
      }
      await writeFile(this.filename, this.carts);
      return this.carts[cartIndex];
    } catch (err: any) {
      throw new Error(`${err.message}`);
    }
  }
}
