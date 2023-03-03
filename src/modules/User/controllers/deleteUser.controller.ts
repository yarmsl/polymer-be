import { Request, Response } from 'express';

import { errorHandler, forbiddenError, notFoundError } from '~/utils/errorHandler';

import { User } from '../User.model';

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) throw notFoundError();

    if (user.role === 'admin') throw forbiddenError();

    await User.findByIdAndDelete(userId);
    return res.status(200).json({ message: 'user successfully removed' });
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'remove user error');
    return res.status(statusCode).json({ message });
  }
};
