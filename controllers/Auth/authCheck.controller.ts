import { Request, Response } from "express";
import User from "../../models/User";

const authCheckController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId = req.body.user.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(400).json({ message: "user not found" });
      return;
    }
    res.json({
      name: user.name,
      role: user.role,
      articles: user.articles,
      customers: user.customers,
      presentationFile: user.presentationFile,
      productions: user.productions,
      projects: user.projects,
      steps: user.steps,
      stories: user.stories,
      storyArticles: user.storyArticles,
      tags: user.tags,
      vacancies: user.vacancies,
    });
  } catch (e) {
    res.status(500).json({ message: "checkauth error" });
    return;
  }
};

export default authCheckController;
