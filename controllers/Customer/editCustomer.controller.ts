import { Request, Response } from "express";
import Customer from "../../models/Customer";

const editCustomerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const logo = req.file != null ? req.file.path : req.body.logo;
    const { customerId } = req.params;
    const { name, description } = req.body;
    const customerExist = await Customer.findOne({ name });
    if (customerExist) {
      res.status(400).json({ message: "this customer exists" });
      return;
    }
    const editedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { name, description, logo },
      { new: true }
    );
    res.status(200).json({ editedCustomer });
    return;
  } catch (e) {
    res.status(500).json({ message: "editing customer error" });
    return;
  }
};

export default editCustomerController;
