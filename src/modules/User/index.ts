import { Router } from 'express';
import { check } from 'express-validator';

import { authCheck, protect } from '~/modules/Auth/middlewares';

import {
  signUpController,
  editUserController,
  editPasswordController,
  getUsersController,
  deleteUserController,
} from './controllers';

const router = Router();

router.post(
  '/signup',
  authCheck,
  [
    check('email', 'incorrect email').isEmail(),
    check('password', 'min password length 6').isLength({ min: 6 }),
    check('name', 'name required').exists(),
  ],
  signUpController,
);

router.put('/', authCheck, protect, editUserController);

router.put(
  '/:userId',
  authCheck,
  protect,
  [check('password', 'min password length 6').isLength({ min: 6 })],
  editPasswordController,
);

router.get('/', authCheck, protect, getUsersController);

router.delete('/:userId', authCheck, protect, deleteUserController);

export * from './User.model';
export default router;
