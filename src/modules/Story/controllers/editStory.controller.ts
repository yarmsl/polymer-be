import { Request, Response } from 'express';

import { Story } from '../Story.model';

export const editStoryController = async (req: Request, res: Response) => {
  try {
    const { storyId } = req.params;
    const { from, content, to } = req.body;
    const editingStory = await Story.findById(storyId);
    if (editingStory) {
      await editingStory.updateOne({
        to,
        content,
        from,
      });
      const result = await Story.findById(storyId);
      res.status(200).json(result);
      return;
    } else {
      res.status(404).json({ message: 'story not found' });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: 'story error' });
    return;
  }
};
