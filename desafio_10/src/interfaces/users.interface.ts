import { Schema, Types } from 'mongoose';
import { Document } from 'mongoose';

export interface UserToRegister extends Document {
  _id: Schema.Types.ObjectId;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  password: string;
  loggedBy: string;
  githubId: string;
  cart: Schema.Types.ObjectId;
  role: string;
  encryptPassword(password: string): Promise<string>;
  matchPassword(password: string): Promise<boolean>;
}

export interface UserJwt {
  id?: Schema.Types.ObjectId;
  first_name: string;
  last_name: string;
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
