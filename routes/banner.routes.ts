import { Router } from "express";
import addBannerController from "../controllers/Banner/addBanner.controller";
import deleteBannerController from "../controllers/Banner/deleteBanner.controller";
import editBannerController from "../controllers/Banner/editBanner.controller";
import getAllBannersController from "../controllers/Banner/getAllBanners.controller";
import editBottomBannerController from "../controllers/BottomBanner/editBottomBanner.controller";
import getBottomBannerController from "../controllers/BottomBanner/getBottomBanner.controller";
import authCheck from "../middleware/auth.middleware";
import bannerUpload from "../middleware/banner.middleware";

const router = Router();

router.get("/", getAllBannersController);
router.post("/", authCheck, bannerUpload, addBannerController);
router.delete("/:bannerId", authCheck, deleteBannerController);
router.put("/:bannerId", authCheck, editBannerController);
router.post("/bottom", authCheck, editBottomBannerController);
router.get("/bottom", getBottomBannerController);
export default router;
