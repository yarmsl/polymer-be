import { Router } from "express";
import addArticleController from "../controllers/Article/addArticle.controller";
import deleteArticleController from "../controllers/Article/deleteArticle.controller";
import editArticleController from "../controllers/Article/editArticle.controller";
import getAllArticlesController from "../controllers/Article/getAllArticles.controller";
import articleUpload from "../middleware/article.middleware";
import authCheck from "../middleware/auth.middleware";

const router = Router();

router.post("/", authCheck, articleUpload, addArticleController);
router.delete("/:articleId", authCheck, deleteArticleController);
router.get("/", getAllArticlesController);
router.get("/cp", authCheck, getAllArticlesController);
router.put("/:articleId", authCheck, articleUpload, editArticleController);
export default router;
