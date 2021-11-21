import { Schema, model } from "mongoose";
import { IProduction } from "../types/types";

const productionSchema = new Schema<IProduction>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    content: { type: String, default: "" },
    articles: [{ type: Schema.Types.ObjectId, ref: "ProductionArticle" }],
    steps: [{ type: Schema.Types.ObjectId, ref: "Step" }],
  },
  { timestamps: true }
);

export default model("Production", productionSchema);
