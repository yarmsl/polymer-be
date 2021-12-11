import { Router } from "express";
import addVacancyController from "../controllers/Vacancy/addVacancy.controller";
import deleteVacancyController from "../controllers/Vacancy/deleteVacancy.controller";
import editVacancyController from "../controllers/Vacancy/editVacancy.controller";
import getAllVacanciesController from "../controllers/Vacancy/getVacancy.controller";

import authCheck from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllVacanciesController);
router.post("/", authCheck, addVacancyController);
router.get("/cp", authCheck, getAllVacanciesController);
router.delete("/:vacancyId", authCheck, deleteVacancyController);
router.put("/:vacancyId", authCheck, editVacancyController);
export default router;
