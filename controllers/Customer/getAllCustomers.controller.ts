import { Request, Response } from "express";
import Customer from "../../models/Customer";

const getAllCustomersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.body?.user?.userId;
  try {
    const customers = await Customer.find();
    if (userId) {
      res.status(200).json(customers);
    } else {
      const customersFE = customers?.map((customer) => {
        return {
          _id: customer._id,
          projects: customer.projects,
          name: customer.name,
          description: customer.description,
          logo: customer.logo,
        };
      });
      res.status(200).json(customersFE);
    }
  } catch (e) {
    res.status(500).json({ message: "getting all customers error" });
    return;
  }
};

export default getAllCustomersController;