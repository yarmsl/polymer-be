import { Request, Response } from "express";
import User from "../../models/User";

const deleteUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { role } = req.body.user;
    if (role === "user") {
      res.status(400).json({ message: "not enough rights" });
      return;
    }
    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ message: "nobody to delete" });
      return;
    }
    const user = await User.findById(userId);
    if (!user) {
      res.status(400).json({ message: "nobody to delete" });
      return;
    }
    if (user.role === "user") {
      await User.findByIdAndDelete(userId);
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
};

export default deleteUserController;
