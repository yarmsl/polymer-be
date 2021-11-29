import { Request, Response } from "express";
import Project from "../../models/Project";

const getAllProjectsController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.body?.user?.userId;
  try {
    const projects = await Project.find();
    if (userId) {
      res.status(200).json(projects);
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
        };
      });
      res.status(200).json(projectsFE);
    }
  } catch (e) {
    res.status(500).json({ message: "getting all projects error" });
    return;
  }
};

export default getAllProjectsController;
