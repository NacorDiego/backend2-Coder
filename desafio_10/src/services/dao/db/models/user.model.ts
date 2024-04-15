import { Model, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserToRegister } from '@interfaces/users.interface';

const userCollection = 'users';

const userSchema = new Schema<UserToRegister>(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
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
      required: function () {
        return this.loggedBy !== 'GitHub';
      },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: function () {
        return this.loggedBy !== 'GitHub';
      },
      unique: true,
    },
    age: {
      type: Number,
      min: 18,
      max: 99,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: function () {
        return this.loggedBy !== 'GitHub';
      },
    },
    loggedBy: {
      type: String,
      enum: ['', 'GitHub'],
      default: '',
    },
    githubId: {
      type: String,
      default: '',
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

// Agrego método para cifrar password
userSchema.methods.encryptPassword = async (
  password: string,
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Agrego método para comprar password con la almacenada en bd
userSchema.methods.matchPassword = async function (
  password: string,
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const userModel: Model<UserToRegister> = model(userCollection, userSchema);

export default userModel;
