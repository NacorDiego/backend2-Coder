import { Types } from 'mongoose';

export interface User {
  id: Types.ObjectId;
  name: string;
  email: string;
  age: number;
}
