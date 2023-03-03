import { Schema, model } from 'mongoose';

const bottomBannerSchema = new Schema<IBottomBanner>(
  {
    projects: [{ type: String }],
  },
  { timestamps: true },
);

export const BottomBanner = model('BottomBanner', bottomBannerSchema);
