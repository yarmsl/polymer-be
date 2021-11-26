import { Request, Response } from "express";
import User from "../../models/User";

const editUserController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { role: authRole } = req.body.user;
    if (authRole === "user") {
      res.status(400).json({ message: "not enough rights" });
      return;
    }
    const { name, role, id } = req.body;
    await User.findByIdAndUpdate(id, { name: name, role: role });
    res.status(200).json({ message: "user successfully edited" });
    return;
  } catch (e) {
    res.status(500).json({ message: "edit user error" });
    return;
  }
};

export default editUserController;
