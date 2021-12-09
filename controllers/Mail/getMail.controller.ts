import { Request, Response } from "express";
import Mail from "../../models/Mail";

const getMailController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const mail = await Mail.findOne();
    if (mail) {
      res
        .status(200)
        .json({
          email: mail.email,
          feedback: mail.feedback,
          provider: mail.provider,
        });
      return;
    } else {
      res.status(400).json({ message: "mail not found" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "getting mail error" });
    return;
  }
};

export default getMailController;
