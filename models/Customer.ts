import { Schema, model } from "mongoose";
import { ICustomer } from "../types/types";

const customerSchema = new Schema<ICustomer>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    company: { type: String, required: true, unique: true, index: true },
    logo: { type: String, required: true },
  },
  { timestamps: true }
);

export default model("Customer", customerSchema);
