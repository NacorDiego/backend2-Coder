import { Model, Schema } from 'mongoose';
import { Document } from 'mongoose';

export interface UserToRegister extends Document {
  _id: Schema.Types.ObjectId;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  password: string;
  loggedBy: string;
  githubId: number;
  cart: Schema.Types.ObjectId;
  role: string;
}

export interface IUserModel extends Model<UserToRegister> {
  encryptPassword(password: string): Promise<string>;
  matchPassword(password: string, hashedPassword: string): Promise<boolean>;
}

export interface UserJwt {
  id: Schema.Types.ObjectId;
  name: string;
  email: string;
  age: number;
  role: string;
  githubId: number;
}

export interface JwtPayload {
  user: UserJwt;
}

export interface NewUser {
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  password: string;
  role: string;
}

export interface IUserGithub {
  username: string;
  email: string;
  githubId: number;
}
