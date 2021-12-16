import { Schema, model } from "mongoose";
import { IProject } from "../types/types";

const projectSchema = new Schema<IProject>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    title: { type: String, required: true },
    done: { type: String, required: true },
    year: { type: Number, required: true },
    images: [{ type: String, required: true }],
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    slug: { type: String, required: true, unique: true, index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default model("Project", projectSchema);
