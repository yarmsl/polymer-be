import { Router } from "express";
import addTagController from "../controllers/Tag/addTag.controller";
import deleteTagController from "../controllers/Tag/deleteTag.controller";
import editTagController from "../controllers/Tag/editTag.controller";
import getAllTagsController from "../controllers/Tag/getAllTags.controller";
import authCheck from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllTagsController);
router.post("/", authCheck, addTagController);
router.get("/cp", authCheck, getAllTagsController);
router.delete("/:tagId", authCheck, deleteTagController);
router.put("/:tagId", authCheck, editTagController);
export default router;