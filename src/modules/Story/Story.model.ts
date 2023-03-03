import { Schema, model } from 'mongoose';

const storySchema = new Schema<IStory>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    from: { type: Number, required: true },
    to: { type: Number, default: 0 },
    content: { type: String, required: true },
  },
  { timestamps: true },
);

export const Story = model('Story', storySchema);
