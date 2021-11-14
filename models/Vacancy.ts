import { Schema, model } from "mongoose";
import { IVacancy } from "../types/types";

const vacancySchema = new Schema<IVacancy>({
  created_on: { type: Date, default: new Date() },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  requirements: { type: String, required: true },
  wage: { type: Number, required: true },
});

export default model("Vacancy", vacancySchema);