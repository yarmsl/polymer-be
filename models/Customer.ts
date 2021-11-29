import { Schema, model } from "mongoose";
import { ICustomer } from "../types/types";

const customerSchema = new Schema<ICustomer>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    name: { type: String, required: true, unique: true, index: true },
    slug: {type: String, required: true, unique: true, index: true },
    logo: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export default model("Customer", customerSchema);
