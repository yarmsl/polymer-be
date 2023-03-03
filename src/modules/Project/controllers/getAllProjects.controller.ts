import { Request, Response } from 'express';

import { Project } from '../Project.model';

export const getAllProjectsController = async (req: Request, res: Response) => {
  const userId = req.body?.user?.userId;
  try {
    const projects = await Project.find().populate('author').populate('tags').populate('customer');
    if (Array.isArray(projects) && projects.length > 0) {
      projects?.sort((a, b) => a.order - b.order);
    }
    if (userId) {
      res.status(200).json(projects);
      return;
    } else {
      const projectsFE = projects?.map((project) => {
        return {
          _id: project._id,
          title: project.title,
          done: project.done,
          year: project.year,
          images: project.images,
          customer: project.customer,
          tags: project.tags,
          slug: project.slug,
          order: project.order,
        };
      });
      res.status(200).json(projectsFE);
      return;
    }
  } catch (e) {
    res.status(500).json({ message: 'getting all projects error' });
    return;
  }
};
