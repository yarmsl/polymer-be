import { existsSync, unlinkSync } from 'fs';

import { Request, Response } from 'express';

import { Customer } from '~/modules/Customer/';
import { Tag } from '~/modules/Tag';
import { User } from '~/modules/User/';

import { Project } from '../Project.model';

export const deleteProjectController = async (req: Request, res: Response) => {
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
      removingProject.images?.forEach((path) => {
        if (existsSync(path)) {
          unlinkSync(path);
        }
      });
      await removingProject.delete();
      res.status(200).json({ message: 'project successfully removed' });
      return;
    } else {
      res.status(404).json({ message: 'project not found' });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: 'remove project error' });
    return;
  }
};
