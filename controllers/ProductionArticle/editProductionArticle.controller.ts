import { Request, Response } from "express";
import ProductionArticle from "../../models/ProductionArticle";
import Step from "../../models/Step";

const editProductionArticleController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { articleId } = req.params;

    const { title, content, steps, order } = req.body;

    const editingProductionArticle = await ProductionArticle.findById(
      articleId
    );

    if (editingProductionArticle) {
      if (Array.isArray(steps) && steps.length > 0) {
        editingProductionArticle.steps?.forEach(async (step) => {
          if (!steps.includes(step.toString())) {
            await Step.findByIdAndUpdate(step, {
              $pull: { productionArticle: editingProductionArticle._id },
            });
          }
        });
        steps.forEach(async (step) => {
          if (
            !editingProductionArticle.steps
              .map((t) => t.toString())
              .includes(step)
          ) {
            await Step.findByIdAndUpdate(step, {
              $push: { productionArticle: editingProductionArticle._id },
            });
          }
        });
      }
      await editingProductionArticle.updateOne({
        title,
        content,
        steps,
        order,
      });
      const result = await ProductionArticle.findById(articleId);
      res.status(200).json(result);
      return;
    } else {
      res.status(404).json({ message: "production article not found" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "editing production article error" });
    return;
  }
};

export default editProductionArticleController;
