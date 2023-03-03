import { Router } from 'express';

import { authCheck } from '~/modules/Auth/';

import {
  addStoryController,
  getAllStoriesController,
  deleteStoryController,
  editStoryController,
} from './controllers';

const router = Router();

router.get('/', getAllStoriesController);
router.post('/', authCheck, addStoryController);
router.get('/cp', authCheck, getAllStoriesController);
router.delete('/:storyId', authCheck, deleteStoryController);
router.put('/:storyId', authCheck, editStoryController);

export * from './Story.model';
export default router;
