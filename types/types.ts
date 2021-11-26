import { Document, Schema } from "mongoose";

export type objId = Schema.Types.ObjectId;
export interface IUser extends Document {
  createdAt: Date;
  updatedAt: Date;
  email: string;
  password: string;
  name: string;
  posts: Schema.Types.ObjectId[];
  role: RoleTypes;
  customers: Schema.Types.ObjectId[];
  tags: Schema.Types.ObjectId[];
  projects: Schema.Types.ObjectId[];
  articles: Schema.Types.ObjectId[];
  productions: Schema.Types.ObjectId[];
  productionArticles: Schema.Types.ObjectId[];
  steps: Schema.Types.ObjectId[];
  stories: Schema.Types.ObjectId[];
  storyArticles: Schema.Types.ObjectId[];
  vacancies: Schema.Types.ObjectId[];
  presentationFile: Schema.Types.ObjectId;
}

export type RoleTypes = "admin" | "user" | "dev";

export interface PostInterface extends Document {
  created_on: Date;
  author: Schema.Types.ObjectId;
  title: string;
  text: string;
  date: Date;
}

export interface ICustomer extends Document {
  createdAt: Date;
  updatedAt: Date;
  author: Schema.Types.ObjectId;
  projects: Schema.Types.ObjectId[];
  name: string;
  logo: string;
  description: string;
}

export interface ITag extends Document {
  createdAt: Date;
  updatedAt: Date;
  author: Schema.Types.ObjectId;
  projects: Schema.Types.ObjectId[];
  name: string;
}

export interface IProject extends Document {
  createdAt: Date;
  updatedAt: Date;
  author: Schema.Types.ObjectId;
  customer: Schema.Types.ObjectId;
  title: string;
  done: string;
  year: number;
  images: string[];
  tags: Schema.Types.ObjectId[];
}

export interface IArticle extends Document {
  createdAt: Date;
  updatedAt: Date;
  author: Schema.Types.ObjectId;
  title: string;
  content: string;
  images: string[];
}

export interface IProduction extends Document {
  createdAt: Date;
  updatedAt: Date;
  author: Schema.Types.ObjectId;
  title: string;
  content: string;
  articles: Schema.Types.ObjectId[];
  steps: Schema.Types.ObjectId[];
}

export interface IProductionArticle extends Document {
  createdAt: Date;
  updatedAt: Date;
  author: Schema.Types.ObjectId;
  title: string;
  content: string;
  production: Schema.Types.ObjectId;
}
export interface IStep extends Document {
  createdAt: Date;
  updatedAt: Date;
  author: Schema.Types.ObjectId;
  production: Schema.Types.ObjectId;
  title: string;
  content: string;
  image: string;
}

export interface IStory extends Document {
  createdAt: Date;
  updatedAt: Date;
  author: Schema.Types.ObjectId;
  from: number;
  to: number;
  content: string;
}

export interface IStoryArticle extends Document {
  createdAt: Date;
  updatedAt: Date;
  author: Schema.Types.ObjectId;
  title: string;
  content: string;
}

export interface IVacancy extends Document {
  createdAt: Date;
  updatedAt: Date;
  author: Schema.Types.ObjectId;
  title: string;
  requirements: string;
  wage: number;
}

export interface IPresentationFile extends Document {
  createdAt: Date;
  updatedAt: Date;
  author: Schema.Types.ObjectId;
  file: string;
}
