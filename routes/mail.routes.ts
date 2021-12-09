import { Router } from "express";
import { check } from "express-validator";
import addMailController from "../controllers/Mail/addMail.controller";
import deleteMailController from "../controllers/Mail/deleteMail.controller";
import feedbackController from "../controllers/Mail/feedback.controller";
import getMailController from "../controllers/Mail/getMail.controller";
import sendFileController from "../controllers/Mail/sendFile.controller";
import sendmailWithFile from "../controllers/Mail/sendmailWithFile.controller";
import authCheck from "../middleware/auth.middleware";

const router = Router();

router.get("/", sendmailWithFile);
router.post(
  "/",
  authCheck,
  [
    check("provider", "provider must be Yandex, Yahoo or Mail.ru").custom(
      (val) => ["Yandex", "Mail.ru", "Yahoo"].includes(val)
    ),
    check("email", "incorrect email").isEmail(),
    check("pass", "password required").exists(),
    check("feedback", "incorrect feedback email").isEmail(),
  ],
  addMailController
);
router.post(
  "/file",
  [check("email", "incorrect email").isEmail()],
  sendFileController
);
router.post(
  "/feedback",
  [
    check("email", "incorrect email").isEmail(),
    check("phone", "phone required").exists(),
  ],
  feedbackController
);
router.get("/cp", authCheck, getMailController);
router.delete("/", authCheck, deleteMailController);

export default router;
