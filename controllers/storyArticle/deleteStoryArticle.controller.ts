import { Request, Response } from "express";
import StoryArticle from "../../models/StoryArticle";
import User from "../../models/User";

const deleteStoryArticleController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { storyId } = req.params;
    const removingStory = await StoryArticle.findById(storyId);
    if (removingStory) {
      await User.findByIdAndUpdate(removingStory.author, {
        $pull: { storyArticles: removingStory._id },
      });

      await removingStory.delete();
      res.status(200).json({ message: "story article successfully removed" });
      return;
    } else {
      res.status(404).json({ message: "story article not found" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "remove story article error" });
    return;
  }
};

export default deleteStoryArticleController;
