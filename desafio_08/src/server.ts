// Server
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
// Logger
import logger from 'morgan';
// Handlebars
import { engine } from 'express-handlebars';
// Utilities
import path from 'path';
import dotenv from 'dotenv';
// Sessions
import session from 'express-session';
import MongoStore from 'connect-mongo';
// Routes
import cartRoutes from '@routes/carts.routes';
import productRoutes from '@routes/products.routes';
import sessionsRoutes from '@routes/sessions.routes';
import userRoutes from '@routes/users.views.routes';
import viewsRoutes from '@routes/views.routes';

dotenv.config();

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

// Configurar handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

// Indicar que vamos a trabajar con archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de sesiones
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      mongoOptions: {},
      autoRemove: 'interval',
      autoRemoveInterval: 10,
    }),
    secret: 'C0d3rS3cr3t', // Key de seguridad
    resave: false, // Guardar en memoria
    saveUninitialized: false, // Guardar apenas se crea la sesión, aunque no tenga info
    cookie: {
      secure: false, // Cambiar esto a true en un entorno de producción con HTTPS habilitado
      httpOnly: true,
      maxAge: 1000 * 60,
    },
  }),
);

// Inicializar io
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

// Routers
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/', viewsRoutes);

export default server;
