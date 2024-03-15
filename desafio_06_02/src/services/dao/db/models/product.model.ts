import { Schema, model } from 'mongoose';

const productCollection = 'products';

const numberTypeSchemaNoUniqueRequired = {
  type: Number,
  required: true,
};

const stringTypeSchemaNoUniqueRequired = {
  type: String,
  required: true,
};

const productSchema = new Schema(
  {
    title: stringTypeSchemaNoUniqueRequired,
    description: stringTypeSchemaNoUniqueRequired,
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    price: numberTypeSchemaNoUniqueRequired,
    status: {
      type: Boolean,
      required: true,
    },
    stock: numberTypeSchemaNoUniqueRequired,
    category: stringTypeSchemaNoUniqueRequired,
    thumbnail: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const productModel = model(productCollection, productSchema);

export default productModel;
