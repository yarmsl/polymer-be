import { Request, Response } from "express";
import Article from "../../models/Article";
import User from "../../models/User";

const addArticleController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.body.user;
    const images =
      req.files != null
        ? (req.files as Express.Multer.File[]).map((file) => file.path)
        : [];
    const { title, content } = req.body;

    const newArticle = new Article({
      author: userId,
      title,
      content,
      images,
    });
    await newArticle.save();

    await User.findByIdAndUpdate(req.body.user.userId, {
      $push: { articles: newArticle._id },
    });
    res.status(201).json(newArticle);
    return;
  } catch (e) {
    res.status(500).json({ message: "adding article error" });
    return;
  }
};

export default addArticleController;
