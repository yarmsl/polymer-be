import { Request, Response } from 'express';

import { User } from '~/modules/User';

import { Customer } from '../Customer.model';

export const createCustomerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body.user;
    const logo = req.file != null ? req.file.path : '';
    const { name, description, slug, order } = req.body;
    const checkExistName = await Customer.findOne({ name });
    if (checkExistName) {
      res.status(400).json({ message: 'this customer exists' });
      return;
    }
    const checkExistSlug = await Customer.findOne({ slug });
    if (checkExistSlug) {
      res.status(400).json({ message: 'this customer exists' });
      return;
    }
    const customer = new Customer({
      author: userId,
      name,
      logo,
      description,
      slug,
      order,
    });
    await customer.save();
    await User.findByIdAndUpdate(req.body.user.userId, {
      $push: { customers: customer._id },
    });
    res.status(201).json(customer);
    return;
  } catch (e) {
    res.status(500).json({ message: 'adding customer error' });
    return;
  }
};
