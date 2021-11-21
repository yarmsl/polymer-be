import { Schema, model } from "mongoose";
import { IProductionArticle } from "../types/types";

const productionArticleSchema = new Schema<IProductionArticle>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    content: { type: String, required: true },
    production: { type: Schema.Types.ObjectId, ref: "Production" },
  },
  { timestamps: true }
);

export default model("ProductionArticle", productionArticleSchema);
