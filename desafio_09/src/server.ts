// Cookies
import cookieParser from 'cookie-parser';
// Handlebars
import { engine } from 'express-handlebars';
// Logger
import logger from 'morgan';
// Passport
import passport from 'passport';
// Routes
import cartRoutes from '@routes/carts.routes';
import productRoutes from '@routes/products.routes';
import usersRoutes from '@routes/users.routes';
import viewsRoutes from '@routes/views.routes';
// Server
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
// Sessions
import session from 'express-session';
import MongoStore from 'connect-mongo';
// Utilities
import path from 'path';
import dotenv from 'dotenv';

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

// Configurar cookies
app.use(cookieParser('C0d3rS3cr3t'));

// Middleware de sesiones
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      mongoOptions: {},
      autoRemove: 'interval', // Eliminar sesiones en intervalos de 1min
      autoRemoveInterval: 1, // eliminar sesion en 1min
    }),
    secret: 'C0d3rS3cr3t', // Key de seguridad
    resave: true, // Guardar en memoria
    saveUninitialized: true, // Guardar apenas se crea la sesión, aunque no tenga info
    cookie: {
      secure: false, // Cambiar esto a true en un entorno de producción con HTTPS habilitado
      httpOnly: true,
      maxAge: 1000 * 60, // eliminar cookie en 1min
    },
  }),
);

// Configurar Passport
app.use(passport.initialize());
app.use(passport.session());

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
app.use('/api/users', usersRoutes);
app.use('/', viewsRoutes);

export default server;
