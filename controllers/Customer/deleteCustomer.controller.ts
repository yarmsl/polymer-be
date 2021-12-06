import { Request, Response } from "express";
import Customer from "../../models/Customer";
import Project from "../../models/Project";
import User from "../../models/User";
import { existsSync, unlinkSync } from "fs";

const deleteCustomerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { customerId } = req.params;
    const removingCustomer = await Customer.findById(customerId);
    if (removingCustomer) {
      await User.findByIdAndUpdate(removingCustomer.author, {
        $pull: { customers: removingCustomer._id },
      });
      removingCustomer.projects?.forEach(async (project) => {
        await Project.findByIdAndUpdate(project, {
          $pull: { customer: removingCustomer._id },
        });
      });
      if (existsSync(removingCustomer.logo)) {
        unlinkSync(removingCustomer.logo);
      }
      await removingCustomer.delete();
      res.status(200).json({ message: "customer successfully removed" });
      return;
    } else {
      res.status(404).json({ message: "customer not found" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "remove customer error" });
    return;
  }
};

export default deleteCustomerController;
