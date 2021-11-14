import { Schema, model } from "mongoose";
import { IStory } from "../types/types";

const storySchema = new Schema<IStory>({
  created_on: { type: Date, default: new Date() },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  from: { type: Number, required: true },
  to: { type: Number, default: 0},
  content: { type: String, required: true },
});

export default model("Story", storySchema);