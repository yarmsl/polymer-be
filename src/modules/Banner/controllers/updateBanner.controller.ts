import { Request, Response } from 'express';

import { Banner } from '../models/Banner.model';

export const updateBannerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bannerId } = req.params;
    const { text, order } = req.body;

    const editedBanner = await Banner.findByIdAndUpdate(bannerId, { text, order }, { new: true });
    res.status(200).json(editedBanner);
    return;
  } catch (e) {
    res.status(500).json({ message: 'editing banner error' });
    return;
  }
};
