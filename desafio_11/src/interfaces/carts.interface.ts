import { Document, Schema } from 'mongoose';

export interface ICart extends Document {
  id_?: Schema.Types.ObjectId;
  products: ProductInTheCart[];
}

export interface ProductInTheCart {
  item: string;
  quantity: number;
}
