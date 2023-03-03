import { Request, Response } from 'express';

import { Banner } from '../models/Banner.model';

export const readBannersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const banners = await Banner.find();
    if (Array.isArray(banners) && banners.length > 0) {
      banners?.sort((a, b) => a.order - b.order);
    }
    res.status(200).json(banners);
    return;
  } catch (e) {
    res.status(500).json({ message: 'getting all banners error' });
    return;
  }
};
