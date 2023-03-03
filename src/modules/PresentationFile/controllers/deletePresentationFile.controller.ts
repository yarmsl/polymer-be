import { existsSync, unlinkSync } from 'fs';

import { Request, Response } from 'express';

import { User } from '~/modules/User';

import { PresentationFile } from '../PresentationFile.model';

export const deletePresentationFileController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { userId } = req.body.user;
    const oldFile = await PresentationFile.find();
    if (Array.isArray(oldFile) && oldFile.length > 0) {
      await PresentationFile.findByIdAndDelete(oldFile[0]._id);
      await User.findByIdAndUpdate(userId, {
        presentationFile: undefined,
      });
      if (existsSync(oldFile[0].file)) {
        unlinkSync(oldFile[0].file);
      }
    }

    res.status(200).json({ message: 'file successfully removed' });
    return;
  } catch (e) {
    res.status(500).json({ message: 'removing file error' });
    return;
  }
};
