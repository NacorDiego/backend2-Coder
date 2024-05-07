import mongoose from 'mongoose';
import { configDB } from './config';

const NAME_DB = configDB.name_bd;
const MONGO_URI = configDB.mongo_uri;

if (MONGO_URI && NAME_DB) {
  mongoose
    .connect(MONGO_URI)
    .then(db => console.log(`DB is connected in ${NAME_DB}`))
    .catch(err => {
      console.log(err);
      process.exit();
    });
} else {
  console.error('No está definida la ruta de conexión a Mongo.');
  process.exit();
}
