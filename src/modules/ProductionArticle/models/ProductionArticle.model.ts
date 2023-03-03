import { Schema, model } from 'mongoose';

const productionArticleSchema = new Schema<IProductionArticle>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    order: { type: Number, default: 0 },
    title: { type: String, required: true },
    content: { type: String, default: '' },
    steps: [{ type: Schema.Types.ObjectId, ref: 'Step' }],
  },
  { timestamps: true },
);

export const ProductionArticle = model('ProductionArticle', productionArticleSchema);
