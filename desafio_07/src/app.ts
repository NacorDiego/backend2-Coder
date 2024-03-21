import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import logger from 'morgan';
import { engine } from 'express-handlebars';
import config from './config';
import productRoutes from '@routes/product.routes';
import cartRoutes from '@routes/cart.routes';
import userRoutes from '@routes/user.routes';
import path from 'path';
import viewsRoutes from '@routes/views.routes';
import { createMessage } from '@services/dao/db/chat.service';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}, // Recupera datos  de conexión interrumpida
});

//  Middleware de registro de logs
app.use(logger('dev'));

// Preparar servidor para recibir JSON
app.use(express.json()); // Permite recibir y entender objetos json.
app.use(express.urlencoded({ extended: true })); // Permite recibir datos codificados de POST en form por url.

// Configuracion handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Indicamos que vamos a trabajar con archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
  res.json('welcome');
});

// Inicialización io
io.on('connection', socket => {
  console.log('An user connected');

  socket.on('disconnect', () => {
    console.log('An user has disconnected');
  });

  socket.on('chat message', async msg => {
    let result;
    try {
      //TODO: Falta el correo del usuario y enviar msg y user en dataMessage.
      // result = await createMessage(dataMessage);
    } catch (error) {}
    //TODO: Debería emitir msg, result.idDelObjInsertado
    io.emit('chat message', msg);
  });
});

// Enrutadores
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/', viewsRoutes);

export default server;
