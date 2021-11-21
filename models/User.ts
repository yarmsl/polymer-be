import { Schema, model } from "mongoose";
import { IUser } from "../types/types";

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: { type: String, default: "user" },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    companies: [{ type: Schema.Types.ObjectId, ref: "Company" }],
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    articles: [{ type: Schema.Types.ObjectId, ref: "Article" }],
    productions: [{ type: Schema.Types.ObjectId, ref: "Production" }],
    productionArticles: [
      { type: Schema.Types.ObjectId, ref: "ProductionArticle" },
    ],
    steps: [{ type: Schema.Types.ObjectId, ref: "Step" }],
    stories: [{ type: Schema.Types.ObjectId, ref: "Story" }],
    storyArticles: [{ type: Schema.Types.ObjectId, ref: "StoryArticle" }],
    vacancies: [{ type: Schema.Types.ObjectId, ref: "Vacancy" }],
    presentationFile: { type: Schema.Types.ObjectId, ref: "PresentationFile" },
  },
  { timestamps: true }
);

export default model("User", userSchema);
