import { Router } from 'express';

import { authCheck } from '~/modules/Auth/';

import {
  createCustomerController,
  readCustomersController,
  updateCustomerController,
  deleteCustomerController,
} from './controllers';
import { customerUpload } from './customer.middleware';

const router = Router();

router.get('/', readCustomersController);
router.post('/', authCheck, customerUpload, createCustomerController);
router.get('/cp', authCheck, readCustomersController);
router.delete('/:customerId', authCheck, deleteCustomerController);
router.put('/:customerId', authCheck, customerUpload, updateCustomerController);

export * from './Customer.model';
export default router;
