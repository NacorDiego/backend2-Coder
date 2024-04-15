import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Product } from '@interfaces/products.interface';

const productCollection = 'products';

const productSchema = new mongoose.Schema<Product>(
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

const productModel = mongoose.model<Product, mongoose.PaginateModel<Product>>(
  productCollection,
  productSchema,
);

export default productModel;
