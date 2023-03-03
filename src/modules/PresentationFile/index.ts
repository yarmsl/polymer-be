import { Router } from 'express';

import { authCheck } from '~/modules/Auth';

import {
  createPresentationFileController,
  deletePresentationFileController,
  readFileController,
} from './controllers';
import fileUpload from './file.middleware';

const router = Router();

router.get('/', readFileController);
router.get('/cp', authCheck, readFileController);
router.post('/', authCheck, fileUpload, createPresentationFileController);
router.delete('/', authCheck, deletePresentationFileController);

export * from './PresentationFile.model';
export default router;
