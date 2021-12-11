import { Router } from "express";
import addProductionArticleController from "../controllers/ProductionArticle/addProductionArticle.controller";
import deleteProductionArticleController from "../controllers/ProductionArticle/deleteProductionArticle.controller";
import editProductionArticleController from "../controllers/ProductionArticle/editProductionArticle.controller";
import getAllProductionArticleController from "../controllers/ProductionArticle/getProductionArticle.controller";
import addStepController from "../controllers/Step/addStep.controller";
import deleteStepController from "../controllers/Step/deleteStep.controller";
import editStepController from "../controllers/Step/editStep.controller";
import getAllStepsController from "../controllers/Step/getAllSteps.controller";

import authCheck from "../middleware/auth.middleware";
import stepUpload from "../middleware/step.middleware";

const router = Router();

router.post("/article", authCheck, addProductionArticleController);
router.delete(
  "/article/:articleId",
  authCheck,
  deleteProductionArticleController
);
router.get("/article", getAllProductionArticleController);
router.get("/article/cp", authCheck, getAllProductionArticleController);
router.put("/article/:articleId", authCheck, editProductionArticleController);

router.post("/step", authCheck, stepUpload, addStepController);
router.delete("/step/:stepId", authCheck, deleteStepController);
router.get("/step/cp", authCheck, getAllStepsController);
router.put("/step/:stepId", authCheck, editStepController);

export default router;
