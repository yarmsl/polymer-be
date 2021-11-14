import { Schema, model } from "mongoose";
import { IArticle } from "../types/types";

const articleSchema = new Schema<IArticle>({
  created_on: { type: Date, default: new Date() },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  content: { type: String, required: true },
  images: [{ type: String, required: true }],
});

export default model("Article", articleSchema);
