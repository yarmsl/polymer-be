import { Request, Response } from 'express';

import { HttpError, errorHandler } from '~/utils/errorHandler';

import { Mail } from '../Mail.model';

export const readMailController = async (req: Request, res: Response) => {
  try {
    const mail = await Mail.findOne();

    if (!mail) throw new HttpError('mail not found', 404);
    return res.status(200).json({
      email: mail.email,
      feedback: mail.feedback,
      provider: mail.provider,
    });
  } catch (e) {
    const { message, statusCode } = errorHandler(e, 'getting mail error');

    return res.status(statusCode).json({ message });
  }
};
