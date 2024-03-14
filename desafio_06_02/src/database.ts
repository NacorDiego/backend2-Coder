import mongoose from 'mongoose';
import config from './config';

const NAME_DB = config.name_bd;
const MONGO_URI = config.mongo_uri;

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
