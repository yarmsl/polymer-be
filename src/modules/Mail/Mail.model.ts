import { Schema, model } from 'mongoose';

const mailSchema = new Schema<IMail>(
  {
    provider: { type: String, required: true },
    email: { type: String, required: true },
    pass: { type: String, required: true },
    feedback: { type: String, required: true },
  },
  { timestamps: true },
);

export const Mail = model('Mail', mailSchema);
