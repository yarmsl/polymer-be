import { Router } from 'express';

import { authCheck } from '~/modules/Auth/';

import {
  getAllStoriesArticleController,
  addStoryArticleController,
  deleteStoryArticleController,
  editStoryArticleController,
} from './controllers';

const router = Router();

router.get('/', getAllStoriesArticleController);
router.post('/', authCheck, addStoryArticleController);
router.get('/cp', authCheck, getAllStoriesArticleController);
router.delete('/:storyId', authCheck, deleteStoryArticleController);
router.put('/:storyId', authCheck, editStoryArticleController);

export * from './StoryArticle.model';
export default router;
