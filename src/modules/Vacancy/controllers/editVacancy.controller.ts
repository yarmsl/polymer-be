import { Request, Response } from 'express';

import { Vacancy } from '../Vacancy.model';

export const editVacancyController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { vacancyId } = req.params;
    const { title, requirements, wage } = req.body;
    const editingVacancy = await Vacancy.findById(vacancyId);
    if (editingVacancy) {
      await editingVacancy.updateOne({
        title,
        requirements,
        wage,
      });
      const result = await Vacancy.findById(vacancyId);
      res.status(200).json(result);
      return;
    } else {
      res.status(404).json({ message: 'vacancy not found' });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: 'vacancy error' });
    return;
  }
};
