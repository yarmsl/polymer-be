import { Schema, model } from 'mongoose';

const articleSchema = new Schema<IArticle>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    images: [{ type: String, required: true }],
  },
  { timestamps: true },
);

export const Article = model('Article', articleSchema);
