import { Schema, model } from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    products: {
      type: [
        {
          item: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: true,
          },
          quantity: {
            type: Number,
            default: 1,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Middleware para ejecutar 'populate' cuando se utilice el método find
cartSchema.pre('find', function () {
  this.populate('products.item');
});

const cartModel = model(cartCollection, cartSchema);

export default cartModel;
