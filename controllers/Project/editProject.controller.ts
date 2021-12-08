import { Request, Response } from "express";
import { existsSync, unlinkSync } from "fs";
import Customer from "../../models/Customer";
import Project from "../../models/Project";
import Tag from "../../models/Tag";

const editProjectController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { projectId } = req.params;
    let images: string[] | undefined = undefined;
    const imagesFilesPaths =
      req.files != null
        ? (req.files as Express.Multer.File[]).map((file) => file.path)
        : [];
    const {
      title,
      year,
      done,
      customer,
      tags,
      images: imagesPaths,
      slug,
    } = req.body;

    const projectExist = await Project.findOne({ slug });
    if (projectExist) {
      res.status(400).json({ message: "this project exists" });
    }

    const editingProject = await Project.findById(projectId);

    if (imagesFilesPaths.length > 0) {
      if (
        editingProject != null &&
        Array.isArray(editingProject.images) &&
        editingProject.images.length > 0
      ) {
        images = editingProject.images.concat(imagesFilesPaths);
      } else {
        images = imagesFilesPaths;
      }
    } else if (Array.isArray(imagesPaths) && imagesPaths.length > 0) {
      if (
        editingProject != null &&
        Array.isArray(editingProject.images) &&
        editingProject.images.length > 0
      ) {
        editingProject.images.forEach((img) => {
          if (!imagesPaths.includes(img)) {
            if (existsSync(img)) {
              unlinkSync(img);
            }
          }
        });
      }
      images = imagesPaths;
    } else {
      images = undefined;
    }

    if (editingProject) {
      if (customer && customer !== editingProject.customer) {
        await Customer.findByIdAndUpdate(editingProject.customer, {
          $pull: { projects: editingProject._id },
        });
        await Customer.findByIdAndUpdate(customer, {
          $push: { projects: customer },
        });
      }
      if (Array.isArray(tags) && tags.length > 0) {
        editingProject.tags?.forEach(async (tag) => {
          if (!tags.includes(tag)) {
            await Tag.findByIdAndUpdate(tag, {
              $pull: { projects: editingProject._id },
            });
          }
        });
        tags.forEach(async (tag) => {
          if (!editingProject.tags.includes(tag)) {
            await Tag.findByIdAndUpdate(tag, {
              $push: { projects: editingProject._id },
            });
          }
        });
      }
      await editingProject.updateOne({
        title,
        year,
        done,
        customer,
        tags,
        images,
        slug,
      });
      const result = await Project.findById(projectId);
      res.status(200).json(result);
      return;
    } else {
      res.status(404).json({ message: "project not found" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "editing project error" });
    return;
  }
};

export default editProjectController;
