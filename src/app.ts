import express from 'express';
import userRoutes from '@routes/product.routes';

const app = express();
const PORT = 3000;

// mideldware para trabajar con JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuracion de archivos estáticos
app.use(express.static(__dirname + '\\public'));

// ENDPOINTS
app.use('api/products', userRoutes);

// TEST
app.get('/ping', (req, res) => {
  console.log(__dirname);
});

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

app.listen(PORT, () => console.log(`The server is listening on port ${PORT}.`));
