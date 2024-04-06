// Cookies
import cookieParser from 'cookie-parser';
// Handlebars
// import exphbs from 'express-handlebars';
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

//? - - - = = = Initializations = = = - - -
dotenv.config();
const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}, // Recupera datos  de conexión interrumpida
});
// const ROUTE_SRC = path.join(__dirname, 'src');

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
console.log('dirname: ', __dirname);
console.log('views: ', path.join(__dirname, 'views'));

app.set('views', path.join(__dirname, 'views'));

// Cookies
app.use(cookieParser('C0d3rS3cr3t'));

// Passport
// app.use(passport.initialize());
// app.use(passport.session());

//? - - - = = = Middlewares = = = - - -
// Log record
app.use(logger('dev'));

// Sessions
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
// Permite recibir datos codificados de POST en form por url.
app.use(express.urlencoded({ extended: true }));

// Preparar servidor para recibir JSON
app.use(express.json());

//? - - - = = = Global Variables = = = - - -

//? - - - = = = Routes = = = - - -
app.use('/', viewsRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/users', usersRoutes);

//? - - - = = = Static files = = = - - -
app.use(express.static(path.join(__dirname, 'public')));

export default server;
