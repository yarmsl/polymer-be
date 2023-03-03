import { Request, Response } from 'express';

import { Tag } from '../Tag.model';

export const getAllTagsController = async (req: Request, res: Response) => {
  const userId = req.body?.user?.userId;
  try {
    const tags = await Tag.find().populate('author').populate('projects');
    if (Array.isArray(tags) && tags.length > 0) {
      tags?.sort((a, b) => a.order - b.order);
    }
    if (userId) {
      res.status(200).json(tags);
    } else {
      const tagsFE = tags?.map((tag) => {
        return {
          _id: tag._id,
          projects: tag.projects,
          name: tag.name,
          slug: tag.slug,
          order: tag.order,
        };
      });
      res.status(200).json(tagsFE);
    }
  } catch (e) {
    res.status(500).json({ message: 'getting all tags error' });
    return;
  }
};
