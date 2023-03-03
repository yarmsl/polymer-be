import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

import { errorHandler, unauthorizedError } from '~/utils/errorHandler';

import { JWT_SECRET } from '../../../config/constants';

export const authCheck = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw unauthorizedError();

    const decoded = jwt.verify(token, JWT_SECRET);

    req.body.user = decoded;
    return next();
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'no auth');
    res.status(statusCode).json({ message });
    return;
  }
};
