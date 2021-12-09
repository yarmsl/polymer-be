import { Request, Response } from "express";
import { validationResult } from "express-validator";

import Mail from "../../models/Mail";

import { sendMail } from "./sendMail";

const feedbackController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, phone, name } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.mapped();
      res.status(400).json({
        message: err?.email?.msg || err?.phone?.msg || "invalid data",
      });
      return;
    }

    const mail = await Mail.findOne();
    if (mail) {
      const message = {
        from: mail.email,
        to: mail.feedback,
        subject: "Сообщение c формы обратной связи",
        text: `От ${name}, телефон: ${phone}, email: ${email}`,
      };

      await sendMail(mail.provider, mail.email, mail.pass, message);

      res.status(200).json({ message: "Мы обязательно свяжемся с Вами" });
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

export default feedbackController;
