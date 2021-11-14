import { Schema, model } from "mongoose";
import { IProject } from "../types/types";

const projectSchema = new Schema<IProject>({
  created_on: { type: Date, default: new Date() },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  customer: { type: Schema.Types.ObjectId, ref: "Company" },
  title: { type: String, required: true },
  done: { type: String, required: true },
  year: { type: Number, required: true },
  images: [{ type: String, required: true }],
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
});

export default model("Project", projectSchema);