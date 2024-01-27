import { Product } from '@interfaces/product.interface';
import fs from 'fs';
import path from 'path';
import Joi from 'joi';

export class ProductManager {
  private products: Product[] = [];
  private idSig: number = 1;
  private path!: string;
  private fileName!: string;
  private pendingChanges: boolean = false;

  //TODO: Implementar load y save para no leer y escribir todo el tiempo el archivo.

  constructor(route: string) {
    this.path = route;
    this.fileName = path.join(this.path, 'productos.json');
    this.crearDirectorio();
    this.loadFromFile();
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

      this.saveChangesToFile();
    } catch (error) {
      console.error(error);
      throw error;
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

  public async updateProduct(id: number, update: Product): Promise<void> {
    try {
      const jsonProducts = await fs.promises.readFile(this.fileName, 'utf-8');
      const parsedProducts = JSON.parse(jsonProducts) as Product[];

      const product = parsedProducts.find(elem => elem.id === id);

      if (!product) {
        throw new Error('El producto no existe.');
      }

      this.saveChangesToFile();
    } catch (error) {
      throw error;
    }
  }

  private async crearDirectorio(): Promise<void> {
    try {
      if (!path) {
        throw new Error('El path no es valido.');
      }

      await fs.promises.mkdir(this.path, { recursive: true });
      const jsonProducts = JSON.stringify(this.products);
      await fs.promises.writeFile(this.fileName, jsonProducts);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  private async loadFromFile(): Promise<void> {
    try {
      // Verifico la existencia del archivo y si tengo permisos para accederlo
      await fs.promises.access(this.fileName, fs.constants.F_OK);

      const jsonProducts = await fs.promises.readFile(this.fileName, 'utf-8');

      if (jsonProducts.trim() === '') {
        console.warn('El archivo esta vacio.');
        return;
      }

      this.products = JSON.parse(jsonProducts) as Product[];
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.warn('El archivo no existe. Se procede a crearlo.');
        const jsonProducts = JSON.stringify(this.products);
        await fs.promises.writeFile(this.fileName, jsonProducts);
      } else {
        console.error(`Error al cargar el archivo: ${error}`);
      }
    }
  }

  private markChanges(): void {
    this.pendingChanges = true;
  }

  private async saveChangesToFile(): Promise<void> {
    try {
      if (this.pendingChanges) {
        const jsonProducts = JSON.stringify(this.products);
        await fs.promises.writeFile(this.fileName, jsonProducts);
        this.pendingChanges = false;
      }
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  }

  private validateCode(code: number): boolean {
    return this.products.some(elem => elem.code === code);
  }

  private validateRequiredFields(product: Product): boolean {
    const productSchema = Joi.object({
      title: Joi.string()
        .required()
        .error(new Error('El titulo es requerido y debe ser un string.')),
      description: Joi.string()
        .required()
        .error(new Error('La descripcion es requerida y debe ser un string.')),
      price: Joi.number()
        .required()
        .error(new Error('El precio es requerido y debe ser un number.')),
      thumbnail: Joi.string()
        .required()
        .error(
          new Error('La URL de la imagen es requerida y debe ser un string.'),
        ),
      code: Joi.number()
        .required()
        .error(new Error('El codigo es requerido y debe ser un number.')),
      stock: Joi.number()
        .required()
        .error(new Error('El stock es requerido y debe ser un number.')),
      id: Joi.number(),
    });

    const { error } = productSchema.validate(product);

    if (error) {
      console.error(`Error de validacion: ${error.message}`);
      return false;
    }

    return true;
  }
}
