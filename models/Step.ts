import { Schema, model } from "mongoose";
import { IStep } from "../types/types";

const stepSchema = new Schema<IStep>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    content: { type: String, required: true },
    production: { type: Schema.Types.ObjectId, ref: "Production" },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Step", stepSchema);
