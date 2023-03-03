import { Schema, model } from 'mongoose';

const bannerSchema = new Schema<IBanner>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Banner = model('Banner', bannerSchema);
