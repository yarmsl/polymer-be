import { Request, Response } from "express";
import User from "../../models/User";

const getUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role } = req.body.user;
    if (role === "user") {
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
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };
      });
      res.status(200).json(result);
      return;
    } else {
      res.status(400).json({ message: "get users error" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "get users error" });
    return;
  }
};

export default getUsersController;
