import { Request, Response } from 'express';

import { StoryArticle } from '../StoryArticle.model';

export const getAllStoriesArticleController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.body?.user?.userId;
  try {
    const stories = await StoryArticle.find().populate('author');
    if (userId) {
      res.status(200).json(stories);
      return;
    } else {
      const storiesFE = stories?.map((st) => {
        return {
          content: st.content,
          title: st.title,
        };
      });
      res.status(200).json(storiesFE);
      return;
    }
  } catch (e) {
    res.status(500).json({ message: 'getting all story articles error' });
    return;
  }
};
