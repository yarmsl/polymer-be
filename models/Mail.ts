import { Schema, model } from "mongoose";
import { IMail } from "../types/types";

const mailSchema = new Schema<IMail>(
  {
    provider: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Mail", mailSchema);