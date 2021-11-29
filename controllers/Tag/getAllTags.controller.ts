import { Request, Response } from "express";
import Tag from "../../models/Tag";

const getAllTagsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.body?.user?.userId;
  try {
    const tags = await Tag.find().populate('author').populate('projects');
    if (userId) {
      res.status(200).json(tags);
    } else {
      const tagsFE = tags?.map((tag) => {
        return {
          _id: tag._id,
          projects: tag.projects,
          name: tag.name,
          slug: tag.slug,
        };
      });
      res.status(200).json(tagsFE);
    }
  } catch (e) {
    res.status(500).json({ message: "getting all tags error" });
    return;
  }
};

export default getAllTagsController;
