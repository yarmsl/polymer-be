import { Request, Response } from "express";
import Banner from "../../models/Banner";

const deleteBannerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bannerId } = req.params;
    const removingBanner = await Banner.findById(bannerId);
    if (removingBanner) {
      await removingBanner.delete();
      res.status(200).json({ message: "banner successfully removed" });
      return;
    } else {
      res.status(404).json({ message: "banner not found" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "remove banner error" });
    return;
  }
};

export default deleteBannerController;
