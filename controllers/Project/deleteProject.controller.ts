import { Request, Response } from "express";
import Customer from "../../models/Customer";
import Project from "../../models/Project";
import Tag from "../../models/Tag";
import User from "../../models/User";

const deleteProjectController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { projectId } = req.params;
    const removingProject = await Project.findById(projectId);
    if (removingProject) {
      await User.findByIdAndUpdate(removingProject.author, {
        $pull: { projects: removingProject._id },
      });
      await Customer.findByIdAndUpdate(removingProject.customer, {
        $pull: { projects: removingProject._id },
      });
      removingProject.tags?.forEach(async (tag) => {
        await Tag.findByIdAndUpdate(tag, {
          $pull: { projects: removingProject._id },
        });
      });
      await removingProject.delete();
      res.status(200).json({ message: "project successfully removed" });
      return;
    } else {
      res.status(404).json({ message: "project not found" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "remove project error" });
    return;
  }
};

export default deleteProjectController;
