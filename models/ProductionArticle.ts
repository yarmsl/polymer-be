import { Schema, model } from "mongoose";
import { IProductionArticle } from "../types/types";

const productionArticleSchema = new Schema<IProductionArticle>({
  created_on: { type: Date, default: new Date() },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  title: {type: String, required: true },
  content: {type: String, required: true },
  production: { type: Schema.Types.ObjectId, ref: "Production" },
});

export default model("ProductionArticle", productionArticleSchema);