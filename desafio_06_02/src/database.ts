import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const NAME_DB = process.env.NAME_DB;
const MONGO_URI = process.env.MONGO_URI;

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
