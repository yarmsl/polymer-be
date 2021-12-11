import { Router } from "express";
import addStoryArticleController from "../controllers/storyArticle/addStoryArticle.controller";
import deleteStoryArticleController from "../controllers/storyArticle/deleteStoryArticle.controller";
import editStoryArticleController from "../controllers/storyArticle/editStoryArticle.controller";
import getAllStoriesArticleController from "../controllers/storyArticle/getStoryArticle.controller";

import authCheck from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllStoriesArticleController);
router.post("/", authCheck, addStoryArticleController);
router.get("/cp", authCheck, getAllStoriesArticleController);
router.delete("/:storyId", authCheck, deleteStoryArticleController);
router.put("/:storyId", authCheck, editStoryArticleController);
export default router;
