import { Request, Response } from 'express';

import { User } from '~/modules/User';

import { Story } from '../Story.model';

export const addStoryController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user;
    const { from, to, content } = req.body;
    const newStory = new Story({
      author: userId,
      from,
      to,
      content,
    });
    await newStory.save();

    await User.findByIdAndUpdate(userId, {
      $push: { stories: newStory._id },
    });
    res.status(201).json(newStory);
    return;
  } catch (e) {
    res.status(500).json({ message: 'adding story error' });
    return;
  }
};
