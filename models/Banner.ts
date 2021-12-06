import { Schema, model } from "mongoose";
import { IBanner } from "../types/types";

const customerSchema = new Schema<IBanner>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    text: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Banner", customerSchema);