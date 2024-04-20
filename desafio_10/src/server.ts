// Cookies
import cookieParser from 'cookie-parser';
// Handlebars
import { engine } from 'express-handlebars';
// Logger
import logger from 'morgan';
// Passport
import passport from 'passport';
import './config/passport.config';
// Routes
import cartRoutes from '@routes/carts.routes';
import productRoutes from '@routes/products.routes';
import usersRoutes from '@routes/users.routes';
import viewsRoutes from '@routes/views.routes';
// Server
import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
// Utilities
import path from 'path';
import dotenv from 'dotenv';
import methodOverride from 'method-override';

//? - - - = = = Initializations = = = - - -
dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}, // Recupera datos  de conexión interrumpida
});

// Socket.io
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

//? - - - = = = Settings = = = - - -
// PORT
app.set('port', process.env.PORT || 3000);

// Handlebars
app.engine(
  '.hbs',
  engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    extname: '.hbs',
  }),
);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Cookies
app.use(cookieParser('C0d3rS3cr3t'));

//? - - - = = = Middlewares = = = - - -
// Log record
app.use(logger('dev'));

// Preparar servidor para recibir JSON
app.use(express.json());

// Permite recibir datos codificados de POST en form por url.
app.use(express.urlencoded({ extended: true }));

// Method-override
app.use(methodOverride('_method'));

// Autenticación y registro con Passport
app.use(passport.initialize());

// Mensajes de exito con cookies
app.use((req, res, next) => {
  // Leer mensaje de la cookie
  res.locals.success_msg = req.cookies.success_msg;
  // Eliminar cookie
  res.clearCookie('success_msg');
  next();
});

// Mensajes de error con cookies
app.use((req, res, next) => {
  // Leer mensaje de la cookie
  res.locals.error_msg = req.cookies.error_msg;
  // Eliminar cookie
  res.clearCookie('error_msg');
  next();
});

//? - - - = = = Global Variables = = = - - -

//? - - - = = = Routes = = = - - -
app.use('/', viewsRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/users', usersRoutes);

//? - - - = = = Static files = = = - - -
app.use(express.static(path.join(__dirname, 'public')));

export default server;
