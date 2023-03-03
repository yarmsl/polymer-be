import { Request, Response } from 'express';

import { User } from '~/modules/User';

import { ProductionArticle, Step } from '../models';

export const deleteProductionArticleController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { articleId } = req.params;
    const removingProductionArticle = await ProductionArticle.findById(articleId);
    if (removingProductionArticle) {
      await User.findByIdAndUpdate(removingProductionArticle.author, {
        $pull: { productionArticles: removingProductionArticle._id },
      });

      removingProductionArticle.steps?.forEach(async (step) => {
        await Step.findByIdAndUpdate(step, {
          $pull: { productionArticle: removingProductionArticle._id },
        });
      });

      await removingProductionArticle.delete();
      res.status(200).json({ message: 'production article successfully removed' });
      return;
    } else {
      res.status(404).json({ message: 'production article not found' });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: 'remove production article error' });
    return;
  }
};
