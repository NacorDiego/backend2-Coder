import { Cart } from '@interfaces/cart.interface';
import fs from 'fs';
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

  public async getCarts(): Promise<Cart[]> {
    try {
      const jsonCarts = await readFile(this.filename);
      return JSON.parse(jsonCarts);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
