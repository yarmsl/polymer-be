import { Schema, model } from "mongoose";
import { IPresentationFile } from "../types/types";

const PresentationFileSchema = new Schema<IPresentationFile>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    file: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("PresentationFile", PresentationFileSchema);
