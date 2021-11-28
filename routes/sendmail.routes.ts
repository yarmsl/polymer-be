import { Router } from "express";
import sendmailWithFile from "../controllers/Sendmail/sendmailWithFile.controller";

const router = Router();

router.get("/", sendmailWithFile);

export default router;