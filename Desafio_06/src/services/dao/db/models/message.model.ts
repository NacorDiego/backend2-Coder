import { Schema, model } from 'mongoose';

const messageCollection = 'messages';

const messageSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, auto: true },
    user: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const messageModel = model(messageCollection, messageSchema);

export default messageModel;
