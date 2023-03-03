import { Request, Response } from 'express';

import { User } from '~/modules/User';

import { Tag } from '../Tag.model';

export const addTagController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user;
    const { name, slug, order } = req.body;
    const checkExistName = await Tag.findOne({ name });
    if (checkExistName) {
      res.status(400).json({ message: 'this tag exists' });
      return;
    }
    const checkExistSlug = await Tag.findOne({ slug });
    if (checkExistSlug) {
      res.status(400).json({ message: 'this tag exists' });
      return;
    }
    const tag = new Tag({ author: userId, name, slug, order });
    await tag.save();
    await User.findByIdAndUpdate(userId, { $push: { tags: tag._id } });
    res.status(201).json(tag);
    return;
  } catch (e) {
    res.status(500).json({ message: 'adding customer error' });
    return;
  }
};
