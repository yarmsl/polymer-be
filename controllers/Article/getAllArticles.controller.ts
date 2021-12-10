import { Request, Response } from "express";
import Article from "../../models/Article";

const getAllArticlesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.body?.user?.userId;
  try {
    const articles = await Article.find().populate("author");
    if (userId) {
      res.status(200).json(articles);
    } else {
      const articlesFE = articles?.map((article) => {
        return {
          _id: article._id,
          title: article.title,
          content: article.content,
          images: article.images,
        };
      });
      res.status(200).json(articlesFE);
    }
  } catch (e) {
    res.status(500).json({ message: "getting all articles error" });
    return;
  }
};

export default getAllArticlesController;
