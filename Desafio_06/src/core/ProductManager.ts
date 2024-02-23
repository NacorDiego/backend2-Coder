import { Product } from '@interfaces/product.interface';
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
  public async addProduct(product: Product): Promise<Product | undefined> {
    try {
      const validationErrors = this.validateRequiredFields(product);

      if (validationErrors) {
        throw new Error(`${validationErrors}`);
      }

      if (this.validateCode(product.code)) {
        throw new Error(`Ya existe un producto con el código ${product.code}`);
      }

      product.id = this.idSig++;
      this.products.push(product);
      await writeFile(this.fileName, this.products);
      return product;
    } catch (err: any) {
      throw new Error(
        `Error al agregar el producto: ${err.message.replace('Error: ', '')}`,
      );
    }
  }

  // Retorna la lista de productos actual.
  public async getProducts(limit?: number): Promise<Product[]> {
    try {
      this.products = await readFile(this.fileName);
      if (limit !== undefined && limit >= 0) {
        return this.products.slice(0, limit);
      } else {
        return this.products;
      }
    } catch (err: any) {
      throw new Error(`Error al cargar los productos: ${err.message}`);
    }
  }

  // Busca y retorna un producto por su ID.
  public async getProductById(id: number): Promise<Product | undefined> {
    try {
      this.products = await readFile(this.fileName);
      const product = this.products.find(elem => elem.id === id);

      return product;
    } catch (err: any) {
      throw new Error(`Error al cargar el producto: ${err.message}`);
    }
  }

  // Actualiza un producto existente y guarda los cambios en el archivo.
  public async updateProduct(
    id: number,
    updateFields: Partial<Product>,
  ): Promise<void> {
    try {
      this.products = await readFile(this.fileName);
      const index = this.products.findIndex(product => product.id === id);

      if (index === -1) {
        throw new Error('No se encontro el producto que se quiere actualizar.');
      }

      this.products[index] = { ...this.products[index], ...updateFields };

      await writeFile(this.fileName, this.products);
    } catch (err: any) {
      throw new Error(`Error al actualizar el producto: ${err.message}`);
    }
  }

  // Elimina un producto y guarda los cambios en el archivo.
  public async deleteProduct(id: number): Promise<void> {
    try {
      this.products = await readFile(this.fileName);
      const index = this.products.findIndex(product => product.id === id);
      if (index === -1) {
        throw new Error('No se encontro el producto que se quiere eliminar.');
      }
      this.products.splice(index, 1);
      await writeFile(this.fileName, this.products);
    } catch (err: any) {
      throw new Error(`Error al eliminar el producto: ${err.message}`);
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
