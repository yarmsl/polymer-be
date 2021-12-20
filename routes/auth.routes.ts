import { Router } from "express";
import { check } from "express-validator";
import authCheck from "../middleware/auth.middleware";
import signInController from "../controllers/Auth/signIn.controller";
import authCheckController from "../controllers/Auth/authCheck.controller";

const router = Router();

router.post(
  "/signin",
  [
    check("email", "enter correct email").isEmail(),
    check("password", "enter pass").exists().notEmpty(),
  ],
  signInController
);

router.get("/", authCheck, authCheckController);

export default router;
