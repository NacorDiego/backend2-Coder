import { Cart } from '@interfaces/cart.interface';
import fs from 'fs';
import path from 'path';

export class CartManager {
  private idSig: number = 1;
  private path!: string;
  private filename!: string;

  constructor(route: string) {
    this.path = route;
    this.filename = path.join(this.path, 'carts.json');
  }
}
