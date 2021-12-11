import { Request, Response } from "express";
import StoryArticle from "../../models/StoryArticle";
import User from "../../models/User";

const addStoryArticleController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.body.user;
    const { title, content } = req.body;
    const newStory = new StoryArticle({
      author: userId,
      title,
      content,
    });
    await newStory.save();

    await User.findByIdAndUpdate(userId, {
      $push: { storyArticles: newStory._id },
    });
    res.status(201).json(newStory);
    return;
  } catch (e) {
    res.status(500).json({ message: "adding story article error" });
    return;
  }
};

export default addStoryArticleController;
