import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { PresentationFile } from '~/modules/PresentationFile';
import { HttpError, errorHandler } from '~/utils/errorHandler';

import { HOST } from '../../../config/constants';
import { Mail } from '../Mail.model';
import { sendMail } from '../utils/sendMail';

export const sendFileController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.mapped();

      throw new HttpError(err?.email?.msg || 'invalid data', 400);
    }

    const file = await PresentationFile.findOne();
    const mail = await Mail.findOne();

    if (!file || !mail) throw new HttpError('Произошла ошибка, попробуйте позже', 400);

    const message = {
      from: mail.email,
      to: email,
      subject: 'УРАЛ-ПОЛИМЕР - Презентация',
      text: 'ООО Урал-Полимер  + 7 (351) 260-40-64',
      attachments: [
        {
          path: `${HOST}/${file.file}`,
        },
      ],
    };

    await sendMail(mail.provider, mail.email, mail.pass, message);

    return res.status(200).json({ message: 'Отправка прошла успешно' });
  } catch (e) {
    const { message, statusCode } = errorHandler(e, 'send e-mail error');

    return res.status(statusCode).json({ message });
  }
};
