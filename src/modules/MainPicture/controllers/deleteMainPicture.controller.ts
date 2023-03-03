import { existsSync, unlinkSync } from 'fs';

import { Request, Response } from 'express';

import { User } from '~/modules/User';
import { errorHandler, notFoundError } from '~/utils/errorHandler';

import { MainPicture } from '../MainPicture.model';

export const deleteMainPictureController = async (req: Request, res: Response) => {
  try {
    const { pictureId } = req.params;

    const removingMainPicture = await MainPicture.findById(pictureId);

    if (!removingMainPicture) throw notFoundError();
    await User.findByIdAndUpdate(removingMainPicture.author, {
      $pull: { projects: removingMainPicture._id },
    });

    if (existsSync(removingMainPicture.src)) {
      unlinkSync(removingMainPicture.src);
    }

    await removingMainPicture.delete();

    return res.status(200).json({ message: 'main picture successfully removed' });
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'remove main picture error');
    return res.status(statusCode).json({ message });
  }
};
