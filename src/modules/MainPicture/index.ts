import { Router } from 'express';

import { authCheck } from '~/modules/Auth';

import {
  createMainPictureController,
  deleteMainPictureController,
  readMainPicturesController,
} from './controllers';
import mainPictureUpload from './mainPicture.middleware';

const router = Router();

router.post('/', authCheck, mainPictureUpload, createMainPictureController);
router.delete('/:pictureId', authCheck, deleteMainPictureController);
router.get('/', readMainPicturesController);
router.get('/cp', authCheck, readMainPicturesController);

export default router;
