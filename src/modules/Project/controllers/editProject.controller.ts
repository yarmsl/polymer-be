import { existsSync, unlinkSync } from 'fs';

import { Request, Response } from 'express';

import { Customer } from '~/modules/Customer';
import { Tag } from '~/modules/Tag';

import { Project } from '../Project.model';

export const editProjectController = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    let images: string[] | undefined = undefined;
    const imagesFilesPaths =
      req.files != null ? (req.files as Express.Multer.File[]).map((file) => file.path) : [];
    const { title, year, done, customer, tags, images: imagesPaths, slug, order } = req.body;
    const projectExist = await Project.findOne({ slug });
    if (projectExist) {
      res.status(400).json({ message: 'this project exists' });
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
      if ((customer && customer !== editingProject?.customer?.toString()) || '') {
        await Customer.findByIdAndUpdate(editingProject.customer, {
          $pull: { projects: editingProject._id },
        });
        await Customer.findByIdAndUpdate(customer, {
          $push: { projects: editingProject._id },
        });
      }
      if (Array.isArray(tags) && tags.length > 0) {
        editingProject.tags?.forEach(async (tag) => {
          if (!tags.includes(tag.toString())) {
            await Tag.findByIdAndUpdate(tag, {
              $pull: { projects: editingProject._id },
            });
          }
        });
        tags.forEach(async (tag) => {
          if (!editingProject.tags.map((t) => t.toString()).includes(tag)) {
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
        order,
      });
      const result = await Project.findById(projectId);
      res.status(200).json(result);
      return;
    } else {
      res.status(404).json({ message: 'project not found' });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: 'editing project error' });
    return;
  }
};
