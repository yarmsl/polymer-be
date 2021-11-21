import { Request, Response, Router } from "express";
import authCheck from "../middleware/auth.middleware";
import avatarUpload from "../middleware/avatar.middleware";
import User from "../models/User";
import { check } from "express-validator";
import signUpController from "../controllers/User/signUp.controller";
import editUserController from "../controllers/User/editUser.controller";
import editPasswordController from "../controllers/User/editPassword.controller";
import getUsersController from "../controllers/User/getUsers.controller";
import deleteUserController from "../controllers/User/deleteUser.controller";

const router = Router();

router.post(
  "/",
  authCheck,
  avatarUpload,
  async (req: Request, res: Response) => {
    const avatar = req.file != null ? req.file.path : "";
    const name = req.body.name;
    const { userId } = req.body.user;

    try {
      if (name) {
        await User.findOneAndUpdate(
          { _id: userId },
          { avatar: avatar, name: name }
        );
      } else {
        await User.findOneAndUpdate({ _id: userId }, { avatar: avatar });
      }
      res.status(200).json({ avatar: avatar, name: name });
    } catch (e) {
      res.status(500).json({ message: "upload file or set name error" });
      return;
    }
  }
);

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
