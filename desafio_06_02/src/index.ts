import app from './app';
import './database';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';
import userRoutes from './routes/user.routes';
import viewsRoutes from './routes/views.routes';
import { createDirectory, createFile } from './services/fileSystem.services';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const ROUTE = __dirname + '/data';
const FILENAME = path.join(ROUTE, '/products.json');
const PORT = process.env.PORT || 8080;

createDirectory(ROUTE);
createFile(FILENAME, '[]');

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/', viewsRoutes);

app.listen(PORT, () => console.log('Server listen on port ', PORT));
