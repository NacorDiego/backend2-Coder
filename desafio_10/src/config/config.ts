import dotenv from 'dotenv';

dotenv.config();

export const configServer = {
  port: process.env.PORT,
};

export const configDB = {
  mongo_uri: process.env.MONGO_URI,
  name_bd: process.env.NAME_DB,
};

export const configGithub = {
  client_id: process.env.GITHUB_CLIENT_ID,
  client_secret: process.env.GITHUB_CLIENT_SECRET,
};
