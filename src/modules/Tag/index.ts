import { Router } from 'express';

import { authCheck } from '~/modules/Auth';

import {
  getAllTagsController,
  addTagController,
  deleteTagController,
  editTagController,
} from './controllers';

const router = Router();

router.get('/', getAllTagsController);
router.post('/', authCheck, addTagController);
router.get('/cp', authCheck, getAllTagsController);
router.delete('/:tagId', authCheck, deleteTagController);
router.put('/:tagId', authCheck, editTagController);

export * from './Tag.model';
export default router;
