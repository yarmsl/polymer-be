import { Request, Response } from 'express';

import { ProductionArticle, Step } from '../models';

export const editStepController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { stepId } = req.params;

    const { title, order, content, productionArticle } = req.body;

    const editingStep = await Step.findById(stepId);

    if (editingStep) {
      if (productionArticle && productionArticle !== editingStep.productionArticle.toString()) {
        await ProductionArticle.findByIdAndUpdate(editingStep.productionArticle, {
          $pull: { steps: editingStep._id },
        });
        await ProductionArticle.findByIdAndUpdate(productionArticle, {
          $push: { steps: editingStep._id },
        });
      }

      await editingStep.updateOne({
        title,
        order,
        content,
        productionArticle,
      });
      const result = await Step.findById(stepId);
      res.status(200).json(result);
      return;
    } else {
      res.status(404).json({ message: 'step not found' });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: 'editing step error' });
    return;
  }
};
