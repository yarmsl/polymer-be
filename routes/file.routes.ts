import { Router } from "express";
import addPresentationFileController from "../controllers/File/addPresentationFile.controller";
import deletePresentationFileController from "../controllers/File/deletePresentationFile.controller";
import getFileController from "../controllers/File/getFile.controller";
import authCheck from "../middleware/auth.middleware";
import fileUpload from "../middleware/file.middleware";

const router = Router();

router.get("/", getFileController);
router.get("/cp", authCheck, getFileController);
router.post("/", authCheck, fileUpload, addPresentationFileController);
router.delete("/", authCheck, deletePresentationFileController);

export default router;
