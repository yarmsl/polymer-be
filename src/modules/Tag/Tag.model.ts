import { Schema, model } from 'mongoose';

const tagSchema = new Schema<ITag>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
    name: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const Tag = model('Tag', tagSchema);
