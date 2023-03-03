import { Router } from 'express';

import { authCheck } from '~/modules/Auth';

import {
  addVacancyController,
  deleteVacancyController,
  editVacancyController,
  getAllVacanciesController,
} from './controllers';

const router = Router();

router.get('/', getAllVacanciesController);
router.post('/', authCheck, addVacancyController);
router.get('/cp', authCheck, getAllVacanciesController);
router.delete('/:vacancyId', authCheck, deleteVacancyController);
router.put('/:vacancyId', authCheck, editVacancyController);

export * from './Vacancy.model';
export default router;
