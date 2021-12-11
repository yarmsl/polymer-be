import { Request, Response } from "express";
import ProductionArticle from "../../models/ProductionArticle";

const getAllProductionArticleController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.body?.user?.userId;
  try {
    const productionArticles = await ProductionArticle.find()
      .populate("author")
      .populate("steps");
    if (userId) {
      res.status(200).json(productionArticles);
      return;
    } else {
      const productionArticlesFE = productionArticles?.map((pa) => {
        return {
          _id: pa._id,
          title: pa.title,
          content: pa.content,
          order: pa.order,
        };
      });
      res.status(200).json(productionArticlesFE);
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "getting all production articles error" });
    return;
  }
};

export default getAllProductionArticleController;
