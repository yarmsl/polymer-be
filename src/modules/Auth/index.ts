import { Router } from 'express';
import { check } from 'express-validator';

import { signInController, authCheckController } from './controllers';
import { authCheck } from './middlewares';

const router = Router();

router.post(
  '/signin',
  [
    check('email', 'enter correct email').isEmail(),
    check('password', 'enter pass').exists().notEmpty(),
  ],
  signInController,
);

router.get('/', authCheck, authCheckController);

export * from './middlewares';
export default router;
