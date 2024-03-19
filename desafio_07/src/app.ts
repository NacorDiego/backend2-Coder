import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
// import { configureChat } from './controllers/chat.controller';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import config from './config';
import productRoutes from '@routes/product.routes';
import cartRoutes from '@routes/cart.routes';
import userRoutes from '@routes/user.routes';
import viewsRoutes from '@routes/views.routes';

const app = express();

// Crear servidor con http
const server = http.createServer(app);
const io = new Server(server); //  Inicializar socket.io en el servidor

//  Middleware de registro de logs
app.use(morgan('dev'));

// Preparar servidor para recibir JSON
app.use(express.json()); // Permite recibir y entender objetos json.
app.use(express.urlencoded({ extended: true })); // Permite recibir datos codificados de POST en form por url.

// Configuracion handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Indicamos que vamos a trabajar con archivos estaticos
app.use(express.static(config.route_public));

// Ruta principal
app.get('/', (req, res) => {
  res.json('welcome');
});

// Enrutadores
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/', viewsRoutes);

export default app;
