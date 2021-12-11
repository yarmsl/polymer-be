import { Request, Response } from "express";
import User from "../../models/User";
import { existsSync, unlinkSync } from "fs";
import Step from "../../models/Step";
import ProductionArticle from "../../models/ProductionArticle";

const deleteStepController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { stepId } = req.params;
    const removingStep = await Step.findById(stepId);
    if (removingStep) {
      await User.findByIdAndUpdate(removingStep.author, {
        $pull: { steps: removingStep._id },
      });
      await ProductionArticle.findByIdAndUpdate(
        removingStep.productionArticle,
        {
          $pull: { steps: removingStep._id },
        }
      );

      if (existsSync(removingStep.image)) {
        unlinkSync(removingStep.image);
      }
      await removingStep.delete();
      res.status(200).json({ message: "step successfully removed" });
      return;
    } else {
      res.status(404).json({ message: "step not found" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "remove step error" });
    return;
  }
};

export default deleteStepController;
