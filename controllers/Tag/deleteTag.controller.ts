import { Request, Response } from "express";
import Project from "../../models/Project";
import Tag from "../../models/Tag";
import User from "../../models/User";

const deleteTagController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { tagId } = req.params;
    const removingTag = await Tag.findById(tagId);
    if (removingTag) {
      await User.findByIdAndUpdate(removingTag.author, {
        $pull: { tags: removingTag._id },
      });
      removingTag.projects.forEach(async (project) => {
        await Project.findByIdAndUpdate(project, {
          $pull: { tags: removingTag._id },
        });
      });
      await removingTag.delete();
      res.status(200).json({ message: "tag successfully removed" });
      return;
    } else {
      res.status(404).json({ message: "tag not found" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "remove tag error" });
    return;
  }
};

export default deleteTagController;
