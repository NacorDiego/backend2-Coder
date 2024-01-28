import { ProductManager } from '@core/ProductManager';

const productManager = new ProductManager('./src/data');

const product = {
  title: 'producto1',
  description: 'descripcion1',
  price: 40,
  thumbnail: 'asdasd.jpg',
  code: 1,
  stock: 80,
  id: 0,
};

productManager.addProduct(product);

const product2 = {
  title: 'producto2',
  description: 'descripcion2',
  price: 50,
  thumbnail: 'asdasd2.jpg',
  code: 2,
  stock: 150,
  id: 0,
};

productManager.addProduct(product2);

console.log(
  `getProducts: ${JSON.stringify(productManager.getProducts(), null, 2)}`,
);

console.log(
  `getProductById(2): ${JSON.stringify(productManager.getProductById(2), null, 2)}`,
);

const updateProduct = {
  description: 'Descripcion actualizada',
  stock: 100,
};

productManager.updateProduct(2, updateProduct);

console.log(
  `getProducts post update: ${JSON.stringify(productManager.getProducts(), null, 2)}`,
);

productManager.deleteProduct(2);

console.log(
  `getProducts post delete: ${JSON.stringify(productManager.getProducts(), null, 2)}`,
);
