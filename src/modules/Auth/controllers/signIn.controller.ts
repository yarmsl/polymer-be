import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { JWT_SECRET } from '~/config/constants';
import { User } from '~/modules/User';
import { HttpError, errorHandler, notFoundError } from '~/utils/errorHandler';

const token = (id: string, role: RoleTypes): string =>
  jwt.sign({ userId: id, role }, JWT_SECRET, {
    expiresIn: '7d',
  });

export const signInController = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.mapped();
      throw new HttpError(err?.email?.msg || err?.password?.msg || 'invalid data', 400);
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw notFoundError();

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw new HttpError('password is incorrect', 400);

    return res.status(200).json({
      name: user.name,
      token: token(user._id, user.role),
      role: user.role,
      articles: user.articles,
      customers: user.customers,
      presentationFile: user.presentationFile,
      productions: user.productions,
      projects: user.projects,
      steps: user.steps,
      stories: user.stories,
      storyArticles: user.storyArticles,
      tags: user.tags,
      vacancies: user.vacancies,
    });
  } catch (e) {
    const { statusCode, message } = errorHandler(e, 'signin error');
    return res.status(statusCode).json({ message });
  }
};
