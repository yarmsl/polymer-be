import { Request, Response } from 'express';

import { errorHandler } from '~/utils/errorHandler';

import { MainPicture } from '../MainPicture.model';

export const readMainPicturesController = async (req: Request, res: Response) => {
  const userId = req.body?.user?.userId;
  try {
    const mainPictures = await MainPicture.find({
      order: [1, 2, 3],
    });

    if (Array.isArray(mainPictures) && mainPictures.length > 0) {
      mainPictures?.sort((a, b) => a.order - b.order);
    }

    if (userId) {
      return res.status(200).json(mainPictures);
    } else {
      const mainPicturesFE = mainPictures?.map((mp) => {
        return {
          _id: mp._id,
          src: mp.src,
          order: mp.order,
        };
      });
      return res.status(200).json(mainPicturesFE);
    }
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'getting all main pictures error');
    return res.status(statusCode).json({ message });
  }
};
