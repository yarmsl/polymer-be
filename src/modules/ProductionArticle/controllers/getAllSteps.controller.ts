import { Request, Response } from 'express';

import { Step } from '../models';

export const getAllStepsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const steps = await Step.find().populate('author');
    res.status(200).json(steps);
    return;
  } catch (e) {
    res.status(500).json({ message: 'getting all steps error' });
    return;
  }
};
