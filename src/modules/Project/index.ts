import { Router } from 'express';

import { authCheck } from '~/modules/Auth';

import {
  addProjectController,
  deleteProjectController,
  editProjectController,
  getAllProjectsController,
} from './controllers';
import projectUpload from './project.middleware';

const router = Router();
router.post('/', authCheck, projectUpload, addProjectController);
router.delete('/:projectId', authCheck, deleteProjectController);
router.get('/', getAllProjectsController);
router.get('/cp', authCheck, getAllProjectsController);
router.put('/:projectId', authCheck, projectUpload, editProjectController);

export * from './Project.model';
export default router;
