import app from './app';
import './database';
import { createDirectory, createFile } from './services/fileSystem.services';
import path from 'path';
import config from './config';

const ROUTE = config.route_file;
const FILENAME = path.join(ROUTE, '/products.json');
const PORT = process.env.PORT || config.port;

createDirectory(ROUTE);
createFile(FILENAME, '[]');

app.listen(PORT, () => console.log('Server listen on port ', PORT));
