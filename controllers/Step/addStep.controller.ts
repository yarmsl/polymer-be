import { Request, Response } from "express";
import ProductionArticle from "../../models/ProductionArticle";
import Step from "../../models/Step";
import User from "../../models/User";

const addStepController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.body.user;
    const image = req.file != null ? req.file.path : "";
    const { title, content, order, productionArticle } = req.body;

    const newStep = new Step({
      author: userId,
      title,
      content,
      order,
      image,
      productionArticle,
    });
    await newStep.save();

    await ProductionArticle.findByIdAndUpdate(productionArticle, {
      $push: { steps: newStep._id },
    });

    await User.findByIdAndUpdate(userId, {
      $push: { steps: newStep._id },
    });
    res.status(201).json(newStep);
    return;
  } catch (e) {
    res.status(500).json({ message: "adding step error" });
    return;
  }
};

export default addStepController;
