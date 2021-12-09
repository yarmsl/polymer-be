import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { HOST } from "../../config/constants";
import Mail from "../../models/Mail";
import PresentationFile from "../../models/PresentationFile";
import { sendMail } from "./sendMail";

const sendFileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.mapped();
      res.status(400).json({
        message: err?.email?.msg || "invalid data",
      });
      return;
    }

    const file = await PresentationFile.findOne();
    const mail = await Mail.findOne();
    if (file && mail) {
      const message = {
        from: mail.email,
        to: email,
        subject: "УРАЛ-ПОЛИМЕР - Презентация",
        text: "ООО Урал-Полимер  + 7 (351) 260-40-64",
        attachments: [
          {
            path: `${HOST}/${file.file}`,
          },
        ],
      };

      await sendMail(mail.provider, mail.email, mail.pass, message);

      res.status(200).json({ message: "Отправка прошла успешно" });
      return;
    } else {
      res.status(400).json({ message: "Произошла ошибка, попробуйте позже" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: `send e-mail error ${e}` });
    return;
  }
};

export default sendFileController;
