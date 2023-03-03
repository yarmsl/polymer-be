import { Schema, model } from 'mongoose';

const mainPicture = new Schema<IMainPicture>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    src: { type: String, required: true },
    order: { type: Number, required: true, unique: true },
  },
  { timestamps: true },
);

export const MainPicture = model('MainPicture', mainPicture);
