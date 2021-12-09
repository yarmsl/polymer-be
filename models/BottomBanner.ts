import { Schema, model } from "mongoose";
import { IBottomBanner } from "../types/types";

const bottomBannerSchema = new Schema<IBottomBanner>(
  {
    projects: [{ type: String }],
  },
  { timestamps: true }
);

export default model("BottomBanner", bottomBannerSchema);