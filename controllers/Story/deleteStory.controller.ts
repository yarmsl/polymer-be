import { Request, Response } from "express";
import Story from "../../models/Story";
import User from "../../models/User";

const deleteStoryController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { storyId } = req.params;
    const removingStory = await Story.findById(storyId);
    if (removingStory) {
      await User.findByIdAndUpdate(removingStory.author, {
        $pull: { stories: removingStory._id },
      });

      await removingStory.delete();
      res.status(200).json({ message: "story successfully removed" });
      return;
    } else {
      res.status(404).json({ message: "story not found" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "remove story error" });
    return;
  }
};

export default deleteStoryController;
