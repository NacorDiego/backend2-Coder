import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    title: String,
    description: String,
    code: Number,
    price: Number,
    status: Boolean,
    stock: Number,
    category: String,
    thumbnail: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model('Product', productSchema);
