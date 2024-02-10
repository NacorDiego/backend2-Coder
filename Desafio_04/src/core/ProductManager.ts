import { Product } from '@interfaces/product.interface';
import fs from 'fs';
import path from 'path';
import {
  createDirectory,
  createFile,
  readFile,
  writeFile,
} from '@services/fileSystemService';
import Joi from 'joi'; // Utilizo esta biblioteca para realizar validaciones.

export class ProductManager {
  private products: Product[] = [];
  private path!: string;
  private fileName!: string;
  private idSig: number = 1;

  // Inicializa la instancia de ProductManager con la ruta del directorio.
  constructor(route: string) {
    this.path = route;
    this.fileName = path.join(this.path, 'products.json');
    createDirectory(this.path);
    createFile(this.fileName, '[]');
  }

  // Agrega un nuevo producto al array y guarda los cambios en el archivo.
  public async addProduct(product: Product): Promise<void> {
    try {
      const validationErrors = this.validateRequiredFields(product);

      if (validationErrors) {
        throw new Error(`Error de validacion: ${validationErrors}.`);
      }

      if (this.validateCode(product.code)) {
        throw new Error(
          `Error: Ya existe un producto con el código ${product.code}`,
        );
      }

      product.id = this.idSig++;
      this.products.push(product);
      await this.saveChangesToFile();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Retorna la lista de productos actual.
  public async getProducts(limit?: number): Promise<Product[]> {
    try {
      await this.loadFromFile();
      if (limit !== undefined && limit >= 0) {
        return this.products.slice(0, limit);
      } else {
        return this.products;
      }
    } catch (error) {
      return [];
    }
  }

  // Busca y retorna un producto por su ID.
  public async getProductById(id: number): Promise<Product | undefined> {
    try {
      await this.loadFromFile();
      const product = this.products.find(elem => elem.id === id);

      if (!product) {
        throw new Error('El producto no existe.');
      }

      return product;
    } catch (error) {
      console.error(`Error: ${error}`);
      return undefined;
    }
  }

  // Actualiza un producto existente y guarda los cambios en el archivo.
  public async updateProduct(
    id: number,
    updateFields: Partial<Product>,
  ): Promise<void> {
    await this.loadFromFile();
    const index = this.products.findIndex(product => product.id === id);

    if (index === -1) {
      throw new Error(
        'Error: No se encontro el producto que se quiere actualizar.',
      );
    }

    this.products[index] = { ...this.products[index], ...updateFields };

    await this.saveChangesToFile();
  }

  // Elimina un producto y guarda los cambios en el archivo.
  public async deleteProduct(id: number): Promise<void> {
    await this.loadFromFile();
    const index = this.products.findIndex(product => product.id === id);

    if (index === -1) {
      throw new Error(
        'Error: No se encontro el producto que se quiere eliminar.',
      );
    }

    this.products.splice(index, 1);

    await this.saveChangesToFile();
  }

  // Crea el directorio si no existe y carga productos desde el archivo.
  private async crearDirectorio(): Promise<void> {
    try {
      if (!this.path) {
        throw new Error('El path no es válido.');
      }

      await fs.promises.mkdir(this.path, { recursive: true });

      await this.loadFromFile();
    } catch (error) {
      console.warn(`El directorio no existe. Se creará con el archivo.`);
    }
  }

  // Carga productos desde el archivo si existe; si no, crea el archivo.
  private async loadFromFile(): Promise<void> {
    try {
      await fs.promises.access(this.fileName, fs.constants.F_OK);

      const jsonProducts = await this.readFile();

      this.products = jsonProducts;
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        console.warn('El archivo no existe. Se procede a crearlo.');
        await this.writeFile(this.products);
      } else {
        console.error(`Error al cargar el archivo: ${error}`);
      }
    }
  }

  // Guarda los cambios en el archivo, truncándolo antes de escribir.
  private async saveChangesToFile(): Promise<void> {
    try {
      await fs.promises.mkdir(this.path, { recursive: true });

      await fs.promises.truncate(this.fileName, 0);

      await this.writeFile(this.products);
    } catch (error) {
      console.error(`Error al guardar los cambios en el archivo: ${error}`);
    }
  }

  // Lee el archivo y retorna los productos como un array.
  private async readFile(): Promise<Product[]> {
    try {
      const jsonProducts = await fs.promises.readFile(this.fileName, 'utf-8');
      return JSON.parse(jsonProducts) as Product[];
    } catch (error) {
      console.error(`Error al leer el archivo: ${error}`);
      return [];
    }
  }

  // Escribe los productos en el archivo.
  private async writeFile(products: Product[]): Promise<void> {
    try {
      const jsonProducts = JSON.stringify(products, null, 2);
      await fs.promises.writeFile(this.fileName, jsonProducts);
    } catch (error) {
      console.error(`Error al escribir el archivo: ${error}`);
    }
  }

  // Verifica si ya existe un producto con el código dado.
  private validateCode(code: number): boolean {
    return this.products.some(elem => elem.code === code);
  }

  // Valida que los campos requeridos del producto estén presentes.
  private validateRequiredFields(
    product: Product,
  ): Joi.ValidationError | undefined {
    const productSchema = Joi.object({
      title: Joi.string()
        .required()
        .error(new Error('El titulo es requerido y debe ser un string.')),
      description: Joi.string()
        .required()
        .error(new Error('La descripcion es requerida y debe ser un string.')),
      code: Joi.number()
        .required()
        .error(new Error('El codigo es requerido y debe ser un number.')),
      price: Joi.number()
        .required()
        .error(new Error('El precio es requerido y debe ser un number.')),
      status: Joi.boolean()
        .required()
        .error(new Error('El estado es requerido y debe ser un boolean.')),
      stock: Joi.number()
        .required()
        .error(new Error('El stock es requerido y debe ser un number.')),
      category: Joi.string()
        .required()
        .error(new Error('La categoría es requerida y debe ser un string.')),
      thumbnail: Joi.string(),
      id: Joi.number(),
    });

    const { error } = productSchema.validate(product);

    if (error) {
      console.error(`Error de validacion: ${error.message}`);
      return error;
    }

    return undefined;
  }
}
