import { Schema, model } from 'mongoose';

const PresentationFileSchema = new Schema<IPresentationFile>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    file: { type: String, required: true },
  },
  { timestamps: true },
);

export const PresentationFile = model('PresentationFile', PresentationFileSchema);
