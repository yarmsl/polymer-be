import { Request, Response } from "express";
import Customer from "../../models/Customer";
import Project from "../../models/Project";
import Tag from "../../models/Tag";
import User from "../../models/User";

const addProjectController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.body.user;
    const images =
      req.files != null
        ? (req.files as Express.Multer.File[]).map((file) => file.path)
        : [];
    const { title, year, done, customer, tags, slug, order } = req.body;
    const arrTags = Array.isArray(tags) ? tags : tags != null ? [tags] : [];
    const projectExist = await Project.findOne({ slug });
    if (projectExist) {
      res.status(400).json({ message: "this project exists" });
      return;
    }
    const newProject = new Project({
      author: userId,
      title,
      year,
      done,
      images,
      customer,
      tags: arrTags,
      slug,
      order
    });
    await newProject.save();
    await Customer.findByIdAndUpdate(customer, {
      $push: { projects: newProject._id },
    });
    arrTags?.forEach(async (tag: string) => {
      await Tag.findByIdAndUpdate(tag, { $push: { projects: newProject._id } });
    });
    await User.findByIdAndUpdate(req.body.user.userId, {
      $push: { projects: newProject._id },
    });
    res.status(201).json(newProject);
    return;
  } catch (e) {
    res.status(500).json({ message: "adding project error" });
    return;
  }
};

export default addProjectController;
