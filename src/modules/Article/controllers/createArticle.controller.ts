import { Request, Response } from 'express';

import { User } from '~/modules/User';

import { Article } from '../Article.model';

export const createArticleController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user;
    const images =
      req.files != null ? (req.files as Express.Multer.File[]).map((file) => file.path) : [];
    const { title, content } = req.body;

    const newArticle = new Article({
      author: userId,
      title,
      content,
      images,
    });
    await newArticle.save();

    await User.findByIdAndUpdate(req.body.user.userId, {
      $push: { articles: newArticle._id },
    });
    return res.status(201).json(newArticle);
  } catch (e) {
    return res.status(500).json({ message: 'adding article error' });
  }
};
