import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  name_bd: process.env.NAME_BD,
  route_file: __dirname + '/data',
  route_public: __dirname + '/src/public',
};

export default config;
