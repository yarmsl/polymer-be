import { Schema, model } from "mongoose";
import { ITag } from "../types/types";

const tagSchema = new Schema<ITag>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    name: { type: String, required: true, unique: true, index: true },
  },
  { timestamps: true }
);

export default model("Tag", tagSchema);
