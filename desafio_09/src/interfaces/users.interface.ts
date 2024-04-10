import { Types } from 'mongoose';
import { Document } from 'mongoose';

export interface UserToRegister extends Document {
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  password: string;
  role: string;
  encryptPassword(password: string): Promise<string>;
  matchPassword(password: string): Promise<boolean>;
}

export interface SessionUser {
  id: Types.ObjectId;
  name: string;
  email: string;
  age: number;
}
