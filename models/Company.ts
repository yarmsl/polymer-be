import { Schema, model } from "mongoose";
import { ICompany } from "../types/types";

const companySchema = new Schema<ICompany>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    company: { type: String, required: true, unique: true, index: true },
    logo: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Company", companySchema);
