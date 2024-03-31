import { Schema, model } from 'mongoose';

const userCollection = 'usuarios';

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      unique: true,
    },
    lastName: String,
    email: {
      type: String,
      unique: true,
    },
    age: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const userModel = model(userCollection, userSchema);

export default userModel;
