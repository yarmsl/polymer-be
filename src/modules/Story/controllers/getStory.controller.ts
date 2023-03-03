import { Request, Response } from 'express';

import { Story } from '../Story.model';

export const getAllStoriesController = async (req: Request, res: Response) => {
  const userId = req.body?.user?.userId;
  try {
    const stories = await Story.find().populate('author');
    if (userId) {
      res.status(200).json(stories);
      return;
    } else {
      const storiesFE = stories?.map((st) => {
        return {
          _id: st._id,
          from: st.from,
          content: st.content,
          to: st.to,
        };
      });
      res.status(200).json(storiesFE);
      return;
    }
  } catch (e) {
    res.status(500).json({ message: 'getting all stories error' });
    return;
  }
};
