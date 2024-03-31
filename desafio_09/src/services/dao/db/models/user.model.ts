import { Schema, model } from 'mongoose';

const userCollection = 'users';

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    last_name: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 99,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'], // Definir los posibles valores de rol
      default: 'user', // Establecer el valor predeterminado como "usuario"
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const userModel = model(userCollection, userSchema);

export default userModel;
