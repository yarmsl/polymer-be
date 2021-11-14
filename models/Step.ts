import { Schema, model } from "mongoose";
import { IStep } from "../types/types";

const stepSchema = new Schema<IStep>({
  created_on: { type: Date, default: new Date() },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  title: {type: String, required: true },
  content: {type: String, required: true },
  production: { type: Schema.Types.ObjectId, ref: "Production" },
  image: {type: String, required: true },
});

export default model("Step", stepSchema);