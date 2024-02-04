import express from 'express';
import { ProductManager } from '@core/ProductManager';

const app = express();
const PORT = 3000;
const productManager = new ProductManager('./src/data');

app.get('/products', (req, res) => {
  res.send('Hello world!');
});

app.listen(PORT, () => console.log(`The server is listening on port ${PORT}.`));
