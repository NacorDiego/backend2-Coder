import { Product } from '@interfaces/product.interface';
import fs from 'fs';

export class ProductManager {
  private products: Product[] = [];
  private idSig: number = 1;
  private path!: string;

  constructor(path: string) {
    this.path = path;
    this.crearDirectorio(path);
  }

  private async crearDirectorio(path: string): Promise<void> {
    try {
      await fs.promises.mkdir(path, { recursive: true });
      console.log(`Se crea el directorio en ${path}`);
    } catch (error) {
      console.error(error);
    }
  }

  public async addProduct(product: Product): Promise<void> {
    if (!this.validateRequiredFields(product)) {
      console.error(
        'Error: El producto no es válido. Todos los campos son requeridos.',
      );
      throw new Error(
        'Error: El producto no es válido. Todos los campos son requeridos.',
      );
    }

    if (this.validateCode(product.code)) {
      console.error(
        `Error: Ya existe un producto con el código ${product.code}`,
      );
      throw new Error(
        `Error: Ya existe un producto con el código ${product.code}`,
      );
    }
    product.id = this.idSig++;
    this.products.push(product);

    const productsJson = JSON.stringify(this.products);
    const fileName = `${this.path}/products.json`;

    await fs.promises.writeFile(fileName, productsJson);
  }

  public getProducts(): Product[] {
    return this.products;
  }

  public getProductById(id: number): Product | undefined {
    let product = this.products.find(elem => elem.id === id);

    if (!product) {
      console.error(`No existe un producto con id ${id}`);
      return undefined;
    }

    return product;
  }

  private validateCode(code: number): boolean {
    return this.products.some(elem => elem.code === code);
  }

  private isValidString(value: string | undefined): boolean {
    return typeof value === 'string' && value.trim() !== '';
  }

  private isValidNumber(value: number | undefined): boolean {
    return typeof value === 'number' && !isNaN(value);
  }

  private validateRequiredFields(product: Product): boolean {
    const { title, description, price, thumbnail, code, stock } = product;
    return (
      this.isValidString(title) &&
      this.isValidString(description) &&
      this.isValidNumber(price) &&
      this.isValidString(thumbnail) &&
      this.isValidNumber(code) &&
      this.isValidNumber(stock)
    );
  }
}
