import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { HttpError, errorHandler } from '~/utils/errorHandler';

import { Mail } from '../Mail.model';
import { sendMail } from '../utils/sendMail';

export const feedbackController = async (req: Request, res: Response) => {
  try {
    const { email, phone, name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.mapped();

      throw new HttpError(err?.email?.msg || err?.phone?.msg || 'invalid data', 400);
    }

    const mail = await Mail.findOne();

    if (!mail) throw new HttpError('Произошла ошибка, попробуйте позже', 400);

    const message = {
      from: mail.email,
      to: mail.feedback,
      subject: 'Сообщение c формы обратной связи',
      text: `От ${name}, телефон: ${phone}, email: ${email}`,
    };

    await sendMail(mail.provider, mail.email, mail.pass, message);

    return res.status(200).json({ message: 'Мы обязательно свяжемся с Вами' });
  } catch (e) {
    const { message, statusCode } = errorHandler(e, 'send e-mail error');

    return res.status(statusCode).json({ message });
  }
};
