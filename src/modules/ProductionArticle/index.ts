import { Router } from 'express';

import { authCheck } from '~/modules/Auth';

import {
  addProductionArticleController,
  deleteProductionArticleController,
  getAllProductionArticleController,
  editProductionArticleController,
  addStepController,
  deleteStepController,
  getAllStepsController,
  editStepController,
} from './controllers';
import stepUpload from './step.middleware';

const router = Router();

router.post('/article', authCheck, addProductionArticleController);
router.delete('/article/:articleId', authCheck, deleteProductionArticleController);
router.get('/article', getAllProductionArticleController);
router.get('/article/cp', authCheck, getAllProductionArticleController);
router.put('/article/:articleId', authCheck, editProductionArticleController);

router.post('/step', authCheck, stepUpload, addStepController);
router.delete('/step/:stepId', authCheck, deleteStepController);
router.get('/step/cp', authCheck, getAllStepsController);
router.put('/step/:stepId', authCheck, editStepController);

export * from './models';
export default router;
