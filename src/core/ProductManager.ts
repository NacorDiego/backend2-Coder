import { Product } from '@interfaces/product.interface';
import fs from 'fs';

export class ProductManager {
  private products: Product[] = [];
  private idSig: number = 1;
  private path!: string;
  private fileName!: string;

  constructor(path: string) {
    this.path = path;
    this.crearDirectorio(path);
  }

  private async crearDirectorio(path: string): Promise<void> {
    try {
      await fs.promises.mkdir(path, { recursive: true });
    } catch (error) {
      console.error(error);
    }
  }

  public async addProduct(product: Product): Promise<void> {
    try {
      if (!this.validateRequiredFields(product)) {
        throw new Error(
          'Error: El producto no es válido. Todos los campos son requeridos.',
        );
      }

      if (this.validateCode(product.code)) {
        throw new Error(
          `Error: Ya existe un producto con el código ${product.code}`,
        );
      }

      product.id = this.idSig++;
      this.products.push(product);

      const productsJson = JSON.stringify(this.products);
      this.fileName = `${this.path}/products.json`;

      await fs.promises.writeFile(this.fileName, productsJson);
    } catch (error) {
      console.error(error);
    }
  }

  public async getProducts(): Promise<Product[]> {
    try {
      const jsonProducts = await fs.promises.readFile(this.fileName, 'utf-8');
      const parsedProducts = JSON.parse(jsonProducts) as Product[];
      return parsedProducts;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async getProductById(id: number): Promise<Product | undefined> {
    try {
      const jsonProducts = await fs.promises.readFile(this.fileName, 'utf-8');
      const parsedProducts = JSON.parse(jsonProducts) as Product[];

      const product = parsedProducts.find(elem => elem.id === id);

      if (!product) {
        throw new Error('El producto no existe.');
      }

      return product;
    } catch (error) {
      console.error(`Error: ${error}`);
      return undefined;
    }
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
