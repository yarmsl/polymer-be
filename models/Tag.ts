import { Schema, model } from "mongoose";
import { ITag } from "../types/types";

const tagSchema = new Schema<ITag>({
  created_on: { type: Date, default: new Date() },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  tag: { type: String, required: true },
  image: { type: String, required: true },
});

export default model("Tag", tagSchema);