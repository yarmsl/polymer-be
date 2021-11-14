import { Schema, model } from "mongoose";
import { IPresentationFile } from "../types/types";

const PresentationFileSchema = new Schema<IPresentationFile>({
  created_on: { type: Date, default: new Date() },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  file: { type: String, required: true },
});

export default model("PresentationFile", PresentationFileSchema);