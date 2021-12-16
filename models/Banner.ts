import { Schema, model } from "mongoose";
import { IBanner } from "../types/types";

const bannerSchema = new Schema<IBanner>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    image: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model("Banner", bannerSchema);
