import { Router } from "express";
import addProjectController from "../controllers/Project/addProject.controller";
import deleteProjectController from "../controllers/Project/deleteProject.controller";
import editProjectController from "../controllers/Project/editProject.controller";
import getAllProjectsController from "../controllers/Project/getAllProjects.controller";
import authCheck from "../middleware/auth.middleware";
import projectUpload from "../middleware/project.middleware";

const router = Router();

router.post("/", authCheck, projectUpload, addProjectController);
router.delete("/:projectId", authCheck, deleteProjectController);
router.get("/", getAllProjectsController);
router.get("/cp", authCheck, getAllProjectsController);
router.put("/:projectId", authCheck, projectUpload, editProjectController)
export default router;
