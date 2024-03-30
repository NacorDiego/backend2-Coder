// Interfaces
import { Product } from '@interfaces/products.interface';
// Services
import * as fs from '@services/fileSystem.services';
// Utilities
import path from 'path';
import Joi from 'joi';

let products: Product[] = [];
const route: string = __dirname + '/data';
const fileName: string = path.join(route, '/products.json');
let idSig: number = 1;

export const createProduct = async (dataProduct: Product) => {
  try {
    const validationErrors = validateRequiredFields(dataProduct);

    if (validationErrors) throw new Error(`${validationErrors}`);

    if (validateCode(dataProduct.code))
      throw new Error(
        `Ya existe un producto con el código ${dataProduct.code}`,
      );

    const id = idSig++;
    dataProduct.id = id.toString();

    products = await fs.readFile(fileName);
    products.push(dataProduct);

    await fs.writeFile(fileName, products);
    return { status: 201, data: dataProduct };
  } catch (error: any) {
    throw new Error(
      `Error al agregar el producto: ${error.message.replace('Error: ', '')}`,
    );
  }
};

export const getProducts = async (limit?: number) => {
  try {
    products = await fs.readFile(fileName);

    if (limit !== undefined && limit >= 0) {
      return { status: 200, data: products.slice(0, limit) };
    } else {
      return { status: 200, data: products };
    }
  } catch (error: any) {
    throw new Error(`Error al traer los productos: ${error.message}`);
  }
};

export const getProductById = async (id: string) => {
  try {
    products = await fs.readFile(fileName);
    const product = products.find(product => product.id === id);

    if (!product)
      throw new Error('No se encontro el producto con el ID especificado');

    return { status: 200, data: product };
  } catch (error: any) {
    throw new Error(`Error al cargar el producto: ${error.message}`);
  }
};

export const updateProductById = async (id: string, updates: any) => {
  try {
    products = await fs.readFile(fileName);

    const index = products.findIndex(product => product.id === id);

    if (index === -1)
      throw new Error('No se encontro el producto que se quiere actualizar');

    products[index] = { ...products[index], ...updates };

    await fs.writeFile(fileName, products);

    return { status: 200, data: products[index] };
  } catch (error: any) {
    throw new Error(`Error al actualizar el producto: ${error.message}`);
  }
};

export const deleteProductById = async (id: string) => {
  try {
    products = await fs.readFile(fileName);

    const index = products.findIndex(product => product.id === id);

    if (index === -1)
      throw new Error('No se encontro el producto que se quiere eliminar');

    products.slice(index, 1);

    await fs.writeFile(fileName, products);

    return { status: 204 };
  } catch (error: any) {
    throw new Error(`Error al eliminar el producto: ${error.message}`);
  }
};

const validateCode = (code: number): boolean => {
  return products.some(elem => elem.code === code);
};

const validateRequiredFields = (
  product: Product,
): Joi.ValidationError | undefined => {
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
    id: Joi.string(),
  });

  const { error } = productSchema.validate(product);

  if (error) {
    console.error(`Error de validacion: ${error.message}`);
    return error;
  }

  return undefined;
};
