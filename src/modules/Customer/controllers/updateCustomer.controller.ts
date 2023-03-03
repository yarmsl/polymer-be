import { Request, Response } from 'express';

import { Customer } from '../Customer.model';

export const updateCustomerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const logo = req.file != null ? req.file.path : req.body.logo;
    const { customerId } = req.params;
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
    const editedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { name, description, logo, slug, order },
      { new: true },
    );
    res.status(200).json(editedCustomer);
    return;
  } catch (e) {
    res.status(500).json({ message: 'editing customer error' });
    return;
  }
};
