import { Schema, model } from "mongoose";
import { IStoryArticle } from "../types/types";

const storyArticleSchema = new Schema<IStoryArticle>({
  created_on: { type: Date, default: new Date() },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

export default model("StoryArticle", storyArticleSchema);