import { NextFunction, Request, Response } from 'express';

import { errorHandler, forbiddenError, unauthorizedError } from '~/utils/errorHandler';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const { user = undefined } = req.body;

    if (!user) throw unauthorizedError();

    if (user.role !== 'admin') throw forbiddenError();

    return next();
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'protect mw error');
    res.status(statusCode).json({ message });
    return;
  }
};
