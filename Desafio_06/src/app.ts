import express from 'express';
import productRoutes from '@routes/product.routes';
import cartRoutes from '@routes/cart.routes';
import viewsRoutes from '@routes/views.routes';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

const app = express();
const PORT = process.env.PORT || 8080;

// mideldware para trabajar con JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuracion de archivos estáticos
app.use(express.static(__dirname + '/public'));

// HANDLEBARS
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// ENDPOINTS
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/', viewsRoutes);

// MANEJO DE ERRORES
// Manejar errores 404 (ruta no encontrada)
app.use((req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Ruta no encontrada',
  });
});

// Manejador cualquier error inesperado.
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).send({
    status: 500,
    message: 'Error interno del servidor',
  });
});

const httpServer = app.listen(PORT, () =>
  console.log(`The server is listening on port ${PORT}.`),
);

// Instancio socket.io
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
  console.log('Nuevo cliente conectado');

  socket.on('productsUpdated', () => {
    socketServer.emit('productsUpdated');
  });
});

export { socketServer };
