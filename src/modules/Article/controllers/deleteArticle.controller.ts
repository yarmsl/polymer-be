import { existsSync, unlinkSync } from 'fs';

import { Request, Response } from 'express';

import { User } from '~/modules/User';

import { Article } from '../Article.model';

export const deleteArticleController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { articleId } = req.params;
    const removingArticle = await Article.findById(articleId);
    if (removingArticle) {
      await User.findByIdAndUpdate(removingArticle.author, {
        $pull: { projects: removingArticle._id },
      });

      removingArticle.images?.forEach((path) => {
        if (existsSync(path)) {
          unlinkSync(path);
        }
      });
      await removingArticle.delete();
      res.status(200).json({ message: 'article successfully removed' });
      return;
    } else {
      res.status(404).json({ message: 'article not found' });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: 'remove article error' });
    return;
  }
};
