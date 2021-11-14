import { Request, Response, Router } from "express";
import authCheck from "../middleware/auth.middleware";
import avatarUpload from "../middleware/avatar.middleware";
import User from "../models/User";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";

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
  async (req: Request, res: Response) => {
    try {
      const { role } = req.body.user;
      if (role !== 'admin') {
        res.status(400).json({message: 'not enough rights'})
        return;
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = errors.mapped();
        res.status(400).json({
          message:
            err?.email?.msg ||
            err?.password?.msg ||
            err?.name.msg ||
            "invalid data",
        });
        return;
      }
      const { email, name, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        res.status(400).json({ message: "user exists" });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, name, password: hashedPassword });
      await user.save();
      res
        .status(201)
        .json({ message: `user ${user.email} successfully created` });
        return
    } catch (e) {
      res.status(500).json({ message: "signup error" });
      return;
    }
  }
);

router.put("/", authCheck, async (req: Request, res: Response) => {
  try {
    const { role: authRole } = req.body.user;
    if (authRole !== "admin") {
      res.status(400).json({ message: "not enough rights" });
      return;
    }
    const { name, role, id } = req.body;
    if (name && role && id) {
      await User.findOneAndUpdate({ _id: id }, { name: name, role: role });
      res.status(200).json({ message: "user successfully edited" });
      return;
    } else {
      res.status(400).json({ message: "edit user error" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "edit user error" });
    return;
  }
});

router.put(
  "/:userId",
  authCheck,
  [check("password", "min password length 6").isLength({ min: 6 })],
  async (req: Request, res: Response) => {
    try {
      const { role: authRole } = req.body.user;
      if (authRole !== "admin") {
        res.status(400).json({ message: "not enough rights" });
        return;
      }
      const { userId } = req.params;
      if (!userId) {
        res.status(400).json({ message: "cant find user" });
        return;
      }
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = errors.mapped();
        res.status(400).json({
          message: err?.password?.msg || "invalid data",
        });
        return;
      }
      const { password } = req.body;
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.findOneAndUpdate(
          { _id: userId },
          { password: hashedPassword }
        );
        res.status(200).json({ message: "password successfully changed" });
        return;
      } else {
        res.status(400).json({ message: "edit user error" });
        return;
      }
    } catch (e) {
      res.status(500).json({ message: "edit user error" });
      return;
    }
  }
);

router.get("/", authCheck, async (req: Request, res: Response) => {
  try {
    const { role } = req.body.user;
    if (role !== "admin") {
      res.status(400).json({ message: "not enough rights" });
      return;
    }
    const users = await User.find({});
    if (users) {
      const result = users.map((user) => {
        return {
          email: user.email,
          id: user._id,
          name: user.name,
          role: user.role,
          created_on: user.created_on,
        };
      });
      res.status(200).json(result);
      return
    } else {
      res.status(400).json({ message: "get users error" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "get users error" });
    return;
  }
});

router.delete("/:userId", authCheck, async (req: Request, res: Response) => {
  try {
    const { role } = req.body.user;
    if (role !== "admin") {
      res.status(400).json({ message: "not enough rights" });
      return;
    }
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ message: "nobody to delete" });
      return;
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(400).json({ message: "nobody to delete" });
      return;
    }
    if (user.role !== "admin") {
      await User.findOneAndDelete({ _id: userId });
      res.status(200).json({ message: "user successfully removed" });
      return;
    } else {
      res.status(400).json({ message: "you cant remove admin" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "remove user error" });
    return;
  }
});

export default router;
