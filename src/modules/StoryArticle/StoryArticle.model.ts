import { Schema, model } from 'mongoose';

const storyArticleSchema = new Schema<IStoryArticle>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

export const StoryArticle = model('StoryArticle', storyArticleSchema);
