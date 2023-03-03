import { Request, Response } from 'express';

import { BottomBanner } from '../models/BottomBanner.model';

export const updateBottomBannerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = req.body?.projects || [];
    const bottomBanner = await BottomBanner.findOne();
    if (bottomBanner) {
      await bottomBanner.update({ projects });
    } else {
      const bb = new BottomBanner({
        projects,
      });
      await bb.save();
    }

    res.status(201).json({ message: 'bottom banner successfully edited' });
    return;
  } catch (e) {
    res.status(500).json({ message: 'editing bottom banner error' });
    return;
  }
};
