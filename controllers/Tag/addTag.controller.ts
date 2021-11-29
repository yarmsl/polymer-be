import { Request, Response } from "express";
import Tag from "../../models/Tag";
import User from "../../models/User";

const addTagController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body.user;
    const { name, slug } = req.body;
    const checkExistName = await Tag.findOne({ name });
    if (checkExistName) {
      res.status(400).json({ message: "this tag exists" });
      return;
    }
    const checkExistSlug = await Tag.findOne({ slug });
    if (checkExistSlug) {
      res.status(400).json({ message: "this tag exists" });
      return;
    }
    const tag = new Tag({ author: userId, name, slug });
    await tag.save();
    await User.findByIdAndUpdate(userId, { $push: { tags: tag._id } })
    res.status(201).json(tag);
    return;
  } catch (e) {
    res.status(500).json({ message: "adding customer error" });
    return;
  }
};

export default addTagController;
