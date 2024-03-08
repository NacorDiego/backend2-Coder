import mongoose from 'mongoose';

const mongoURI = '';

mongoose
  .connect('')
  .then(db => console.log('Db is connected'))
  .catch(err => console.error(err));
