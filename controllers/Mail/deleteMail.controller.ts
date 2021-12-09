import { Request, Response } from "express";
import Mail from "../../models/Mail";

const deleteMailController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await Mail.findOneAndDelete();

    res.status(200).json({ message: "mail successfully removed" });
    return;
  } catch (e) {
    res.status(500).json({ message: "removing mail error" });
    return;
  }
};

export default deleteMailController;
