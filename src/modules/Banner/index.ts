import { Router } from 'express';

import { authCheck } from '~/modules/Auth';

import { bannerUpload } from './banner.middleware';
import {
  createBannerController,
  readBannersController,
  updateBannerController,
  deleteBannerController,
  updateBottomBannerController,
  readBottomBannerController,
} from './controllers';

const router = Router();

router.get('/', readBannersController);
router.post('/', authCheck, bannerUpload, createBannerController);
router.delete('/:bannerId', authCheck, deleteBannerController);
router.put('/:bannerId', authCheck, updateBannerController);
router.post('/bottom', authCheck, updateBottomBannerController);
router.get('/bottom', readBottomBannerController);

export * from './models';
export default router;
