import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { User } from '~/modules/User';
import { HttpError, errorHandler } from '~/utils/errorHandler';

import { Mail } from '../Mail.model';
import { sendMail } from '../utils/sendMail';

export const createMailController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.mapped();

      throw new HttpError(
        err?.provider?.msg ||
          err?.email?.msg ||
          err?.pass?.msg ||
          err?.feedback.msg ||
          'invalid data',
        400,
      );
    }

    const { provider, email, feedback, pass } = req.body;

    const user = await User.findById(userId);

    if (!user) throw new HttpError('no auth', 401);

    const oldMail = await Mail.find();
    if (Array.isArray(oldMail) && oldMail.length > 0) {
      await Mail.findByIdAndDelete(oldMail[0]._id);
    }

    const newMail = new Mail({
      provider,
      email,
      feedback,
      pass,
    });
    await newMail.save();

    const confirmMessage = {
      from: email,
      to: email,
      subject: 'Почтовый адрес успешно добавлен',
      text: 'Отпарвлено из панели управления Урал-Полимер',
    };

    const confirmFeedbackMessage = {
      from: email,
      to: feedback,
      subject: 'Почтовый адрес для обратной связи успешно добавлен',
      text: 'Отпарвлено из панели управления Урал-Полимер',
    };

    await sendMail(provider, email, pass, confirmMessage);

    await sendMail(provider, email, pass, confirmFeedbackMessage);

    return res.status(201).json({ message: 'Ожидайте подтверждения на указанных адресах' });
  } catch (e) {
    const { message, statusCode } = errorHandler(e, 'adding message error');
    return res.status(statusCode).json({ message });
  }
};
