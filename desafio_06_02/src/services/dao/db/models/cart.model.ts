import { Schema, model } from 'mongoose';

const cartCollection = 'carts';

const productInTheCartSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  quantity: { type: Number, default: 1 },
});

const cartSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    products: { type: [productInTheCartSchema], required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const cartModel = model(cartCollection, cartSchema);

export default cartModel;
