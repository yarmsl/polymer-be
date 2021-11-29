import { Request, Response } from "express";
import Tag from "../../models/Tag";

const editTagController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { tagId } = req.params;
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
    const editedTag = await Tag.findByIdAndUpdate(
      tagId,
      { name, slug },
      { new: true }
    );
    res.status(200).json({ editedTag });
    return;
  } catch (e) {
    res.status(500).json({ message: "editing customer error" });
    return;
  }
};

export default editTagController;
