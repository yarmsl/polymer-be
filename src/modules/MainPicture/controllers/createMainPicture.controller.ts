import { existsSync, unlinkSync } from 'fs';

import { Request, Response } from 'express';

import { User } from '~/modules/User';
import { HttpError, errorHandler } from '~/utils/errorHandler';

import { MainPicture } from '../MainPicture.model';

export const createMainPictureController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user;
    const src = req.file != null ? req.file.path : '';
    const { order } = req.body;

    if (+order < 1 || +order > 3) {
      if (existsSync(src)) {
        unlinkSync(src);
      }
      throw new HttpError('wrong order', 400);
    }

    const existedMainPicture = await MainPicture.findOne({ order });

    if (existedMainPicture) {
      await existedMainPicture.updateOne({ src });

      if (existedMainPicture.author !== req.body.user.userId) {
        await User.findByIdAndUpdate(existedMainPicture.author, {
          $pull: { mainPictures: existedMainPicture._id },
        });

        await User.findByIdAndUpdate(req.body.user.userId, {
          $push: { mainPictures: existedMainPicture._id },
        });
      }

      if (existsSync(existedMainPicture.src)) {
        unlinkSync(existedMainPicture.src);
      }

      const newMp = await MainPicture.findById(existedMainPicture._id);

      return res.status(201).json(newMp);
    }

    const mainPicture = new MainPicture({
      author: userId,
      src,
      order,
    });
    await mainPicture.save();
    await User.findByIdAndUpdate(req.body.user.userId, {
      $push: { mainPictures: mainPicture._id },
    });
    return res.status(201).json(mainPicture);
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'adding main picture error');
    return res.status(statusCode).json({ message });
  }
};
