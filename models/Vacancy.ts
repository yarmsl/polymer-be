import { Schema, model } from "mongoose";
import { IVacancy } from "../types/types";

const vacancySchema = new Schema<IVacancy>(
  {
    author: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    requirements: { type: String, required: true },
    wage: { type: Number, required: true },
  },
  { timestamps: true }
);

export default model("Vacancy", vacancySchema);
