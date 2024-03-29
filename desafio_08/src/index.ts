import server from './config/server';
import './config/database';
import { createDirectory, createFile } from './services/fileSystem.services';
import path from 'path';
import config from './config/config';

const ROUTE = path.join(__dirname + '/data');
const FILENAME = path.join(ROUTE, '/products.json');
const PORT = process.env.PORT || config.port;

createDirectory(ROUTE);
createFile(FILENAME, '[]');

server.listen(PORT, () =>
  console.log(`Server listen on http://localhost:${PORT}/`),
);
