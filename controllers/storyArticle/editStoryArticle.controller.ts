import { Request, Response } from "express";
import StoryArticle from "../../models/StoryArticle";

const editStoryArticleController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { storyId } = req.params;
    const { title, content } = req.body;
    const editingStory = await StoryArticle.findById(storyId);
    if (editingStory) {
      await editingStory.updateOne({
        title,
        content,
      });
      const result = await StoryArticle.findById(storyId);
      res.status(200).json(result);
      return;
    } else {
      res.status(404).json({ message: "story article not found" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "story article error" });
    return;
  }
};

export default editStoryArticleController;
