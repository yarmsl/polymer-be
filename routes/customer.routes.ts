import { Router } from "express";
import getAllCustomersController from "../controllers/Customer/getAllCustomers.controller";
import addCustomerController from "../controllers/Customer/addCustomer.controller";
import authCheck from "../middleware/auth.middleware";
import customerUpload from "../middleware/customer.middleware";
import deleteCustomerController from "../controllers/Customer/deleteCustomer.controller";
import editCustomerController from "../controllers/Customer/editCustomer.controller";

const router = Router();

router.get("/", getAllCustomersController);
router.post("/", authCheck, customerUpload, addCustomerController);
router.get("/cp", authCheck, getAllCustomersController);
router.delete("/:customerId", authCheck, deleteCustomerController);
router.put("/:customerId", authCheck, customerUpload, editCustomerController);
export default router;
