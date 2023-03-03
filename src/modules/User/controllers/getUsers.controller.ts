import { Request, Response } from 'express';

import { errorHandler, notFoundError } from '~/utils/errorHandler';

import { User } from '../User.model';

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    if (!Array.isArray(users) || users.length) throw notFoundError();
    const result = users.map((user) => {
      return {
        email: user.email,
        id: user._id,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
    return res.status(200).json(result);
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'get users error');
    return res.status(statusCode).json({ message });
  }
};
