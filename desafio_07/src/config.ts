import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  name_bd: process.env.NAME_DB,
};

export default config;
