import app from './app';
import './database';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';
import viewsRoutes from './routes/views.routes';

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewsRoutes);

const PORT = 8080;

app.listen(PORT, () => console.log('Server listen on port ', PORT));
