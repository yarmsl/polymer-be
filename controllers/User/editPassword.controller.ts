import { Request, Response } from "express";
import User from "../../models/User";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";

const editPasswordController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { role: authRole } = req.body.user;
    if (authRole === "user") {
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
};

export default editPasswordController;
