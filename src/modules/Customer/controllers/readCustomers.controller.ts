import { Request, Response } from 'express';

import { Customer } from '../Customer.model';

export const readCustomersController = async (req: Request, res: Response): Promise<void> => {
  const userId = req.body?.user?.userId;
  try {
    const customers = await Customer.find().populate('author').populate('projects');
    if (Array.isArray(customers) && customers.length > 0) {
      customers.sort((a, b) => a.order - b.order);
    }
    if (userId) {
      res.status(200).json(customers);
      return;
    } else {
      const customersFE = customers?.map((customer) => {
        return {
          _id: customer._id,
          projects: customer.projects,
          name: customer.name,
          description: customer.description,
          logo: customer.logo,
          slug: customer.slug,
          order: customer.order,
        };
      });
      res.status(200).json(customersFE);
      return;
    }
  } catch (e) {
    res.status(500).json({ message: 'getting all customers error' });
    return;
  }
};
