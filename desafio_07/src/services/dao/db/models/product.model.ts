import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface IProduct extends mongoose.Document {
  title: string;
  description: string;
  code: number;
  price: number;
  status: boolean;
  stock: number;
  category: string;
  thumbnail?: string;
}

const productSchema = new mongoose.Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    price: { type: Number, required: true },
    status: {
      type: Boolean,
      required: true,
    },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    thumbnail: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

productSchema.plugin(mongoosePaginate);

const productModel = mongoose.model<IProduct, mongoose.PaginateModel<IProduct>>(
  'products',
  productSchema,
);

export default productModel;
