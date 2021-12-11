import { Router } from "express";
import addStoryController from "../controllers/Story/addStory.controller";
import deleteStoryController from "../controllers/Story/deleteStory.controller";
import editStoryController from "../controllers/Story/editStory.controller";
import getAllStoriesController from "../controllers/Story/getStory.controller";
import authCheck from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllStoriesController);
router.post("/", authCheck, addStoryController);
router.get("/cp", authCheck, getAllStoriesController);
router.delete("/:storyId", authCheck, deleteStoryController);
router.put("/:storyId", authCheck, editStoryController);
export default router;
