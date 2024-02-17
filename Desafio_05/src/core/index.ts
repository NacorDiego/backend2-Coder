import { CartManager } from './CartManager';
import { ProductManager } from './ProductManager';

const cartManager = new CartManager(__dirname + '..\\..\\data');
const productManager = new ProductManager(__dirname + '..\\..\\data');

export { cartManager };
export { productManager };
