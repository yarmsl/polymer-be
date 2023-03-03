import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import bcrypt from 'bcrypt';

import { HttpError, errorHandler, notFoundError } from '~/utils/errorHandler';

import { User } from '../User.model';

export const editPasswordController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!userId) notFoundError();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.mapped();

      throw new HttpError(err?.password?.msg || 'invalid data', 400);
    }
    const { password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    await User.findOneAndUpdate({ _id: userId }, { password: hashedPassword });
    return res.status(200).json({ message: 'password successfully changed' });
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'edit user error');
    return res.status(statusCode).json({ message });
  }
};
