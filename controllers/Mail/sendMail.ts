import { createTransport } from "nodemailer";
import { MailOptions } from "nodemailer/lib/sendmail-transport";

export const sendMail = (
  service: string,
  user: string,
  pass: string,
  msg: MailOptions
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const transporter = createTransport({
      service,
      auth: {
        user,
        pass,
      },
      headers: {
        Precedence: "bulk",
      },
    });
    transporter.sendMail(msg, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });
};
