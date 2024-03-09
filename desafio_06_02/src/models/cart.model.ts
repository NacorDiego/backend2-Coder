import { Schema, model } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new Schema({});

const cartModel = model(cartCollection, cartSchema);

export default cartModel;
