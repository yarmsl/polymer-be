import { Router } from 'express';

import { authCheck } from '~/modules/Auth/';

import { articleUpload } from './article.middleware';
import {
  createArticleController,
  readArticlesController,
  updateArticleController,
  deleteArticleController,
} from './controllers';

const router = Router();

router.post('/', authCheck, articleUpload, createArticleController);
router.delete('/:articleId', authCheck, deleteArticleController);
router.get('/', readArticlesController);
router.get('/cp', authCheck, readArticlesController);
router.put('/:articleId', authCheck, articleUpload, updateArticleController);

export * from './Article.model';
export default router;
