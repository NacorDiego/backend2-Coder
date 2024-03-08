import mongoose from 'mongoose';
import Mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost:27017/backend_ch')
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));
