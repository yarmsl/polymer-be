import { Schema, model } from "mongoose";
import { IProduction } from "../types/types";

const productionSchema = new Schema<IProduction>({
  created_on: { type: Date, default: new Date() },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  title: {type: String, required: true },
  content: {type: String, default: ''},
  articles: [{ type: Schema.Types.ObjectId, ref: "ProductionArticle" }],
  steps: [{ type: Schema.Types.ObjectId, ref: "Step" }],
});

export default model("Production", productionSchema);