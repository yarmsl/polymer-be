import { Router } from 'express';
import { check } from 'express-validator';

import { authCheck } from '~/modules/Auth';

import {
  createMailController,
  deleteMailController,
  feedbackController,
  readMailController,
  sendFileController,
} from './controllers';

const router = Router();

router.post(
  '/',
  authCheck,
  [
    check('provider', 'provider must be Yandex, Yahoo or Mail.ru').custom((val) =>
      ['Yandex', 'Mail.ru', 'Yahoo'].includes(val),
    ),
    check('email', 'incorrect email').isEmail(),
    check('pass', 'password required').exists(),
    check('feedback', 'incorrect feedback email').isEmail(),
  ],
  createMailController,
);
router.post('/file', [check('email', 'incorrect email').isEmail()], sendFileController);
router.post(
  '/feedback',
  [check('email', 'incorrect email').isEmail(), check('phone', 'phone required').exists()],
  feedbackController,
);
router.get('/cp', authCheck, readMailController);
router.delete('/', authCheck, deleteMailController);

export default router;
