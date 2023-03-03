import { Request, Response } from 'express';

import { User } from '~/modules/User';
import { errorHandler, notFoundError } from '~/utils/errorHandler';

export const authCheckController = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw notFoundError();
    }
    return res.json({
      name: user.name,
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
    const { statusCode, message } = errorHandler(e, 'checkauth error');
    return res.status(statusCode).json({ message });
  }
};
