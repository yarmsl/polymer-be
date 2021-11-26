import { Router } from "express";
import authCheck from "../middleware/auth.middleware";
import { check } from "express-validator";
import signUpController from "../controllers/User/signUp.controller";
import editUserController from "../controllers/User/editUser.controller";
import editPasswordController from "../controllers/User/editPassword.controller";
import getUsersController from "../controllers/User/getUsers.controller";
import deleteUserController from "../controllers/User/deleteUser.controller";

const router = Router();

router.post(
  "/signup",
  authCheck,
  [
    check("email", "incorrect email").isEmail(),
    check("password", "min password length 6").isLength({ min: 6 }),
    check("name", "name required").exists(),
  ],
  signUpController
);

router.put("/", authCheck, editUserController);

router.put(
  "/:userId",
  authCheck,
  [check("password", "min password length 6").isLength({ min: 6 })],
  editPasswordController
);

router.get("/", authCheck, getUsersController);

router.delete("/:userId", authCheck, deleteUserController);

export default router;
