import { Request, Response } from "express";
import nodemailer from "nodemailer";

const sendmailWithFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const message = {
      from: "slideryo@yandex.ru",
      to: "slideryo@gmail.com",
      subject: "test",
      text: "Тестовая отправка",
      attachments: [
        {
          filename: "test.png",
          path: "http://localhost:5000/uploads/project/Screenshot_20211103_140526.png_1637910487467.svg",
        },
      ],
    };
    const transporter = nodemailer.createTransport({
      service: "Yandex",
      auth: {
        user: 'slideryo@yandex.com',
        pass: 'yandex427YAROSLAV',
      },
    });
    transporter.sendMail(message, (err, info) => {
      if (err) {
        res.status(400).json({ message: err });
        return;
      } else {
        res.status(200).json({ message: info });
        return;
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "send e-mail error" });
    return;
  }
};

export default sendmailWithFile;
