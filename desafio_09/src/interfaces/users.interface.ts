import { Types } from 'mongoose';
// import { Document } from 'mongoose';

// export interface IUser extends Document {
//   first_name: string;
//   last_name: string;
//   email: string;
//   age: number;
//   role: 'admin' | 'user';
// }

export interface SessionUser {
  id: Types.ObjectId;
  name: string;
  email: string;
  age: number;
}
