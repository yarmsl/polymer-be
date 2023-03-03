import { Request, Response } from 'express';

import { User } from '~/modules/User';

import { ProductionArticle } from '../models';

export const addProductionArticleController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.body.user;

    const { title, order, content } = req.body;

    const newProductionArticle = new ProductionArticle({
      author: userId,
      title,
      order,
      content,
    });
    await newProductionArticle.save();

    await User.findByIdAndUpdate(userId, {
      $push: { productionArticles: newProductionArticle._id },
    });
    res.status(201).json(newProductionArticle);
    return;
  } catch (e) {
    res.status(500).json({ message: 'adding production article error' });
    return;
  }
};
