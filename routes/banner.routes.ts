import { Router } from "express";
import addBannerController from "../controllers/Banner/addBanner.controller";
import deleteBannerController from "../controllers/Banner/deleteBanner.controller";
import editBannerController from "../controllers/Banner/editCustomer.controller";
import getAllBannersController from "../controllers/Banner/getAllBanners.controller";
import authCheck from "../middleware/auth.middleware";
import bannerUpload from "../middleware/banner.middleware";

const router = Router();

router.get("/", getAllBannersController);
router.post("/", authCheck, bannerUpload, addBannerController);
router.delete("/:bannerId", authCheck, deleteBannerController);
router.put("/:bannerId", authCheck, editBannerController);
export default router;
