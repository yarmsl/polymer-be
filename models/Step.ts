import { Schema, model } from "mongoose";
import { IStep } from "../types/types";

const stepSchema = new Schema<IStep>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    order: { type: Number, default: 0 },
    title: { type: String, required: true },
    content: { type: String, required: true },
    productionArticle: {
      type: Schema.Types.ObjectId,
      ref: "ProductionArticle",
    },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Step", stepSchema);
