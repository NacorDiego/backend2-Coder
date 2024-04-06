// Server
import server from './server';
// Database
import './config/database';
// Utilities
import config from './config/config';
// import path from 'path';
// Filesystem
// import { createDirectory, createFile } from './services/fileSystem.services';

const PORT = process.env.PORT || config.port;

//? Habilitar cuando use filesystem
// const ROUTE = path.join(__dirname + '/data');
// const FILENAME = path.join(ROUTE, '/products.json');
// createDirectory(ROUTE);
// createFile(FILENAME, '[]');

server.listen(PORT, () =>
  console.log(`Server listen on http://localhost:${PORT}/`),
);
