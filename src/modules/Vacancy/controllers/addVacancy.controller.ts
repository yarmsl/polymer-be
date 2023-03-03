import { Request, Response } from 'express';

import { User } from '~/modules/User';

import { Vacancy } from '../Vacancy.model';

export const addVacancyController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body.user;
    const { title, requirements, wage } = req.body;
    const newVacancy = new Vacancy({
      author: userId,
      title,
      requirements,
      wage,
    });
    await newVacancy.save();

    await User.findByIdAndUpdate(userId, {
      $push: { vacancies: newVacancy._id },
    });
    res.status(201).json(newVacancy);
    return;
  } catch (e) {
    res.status(500).json({ message: 'adding vacancy error' });
    return;
  }
};
