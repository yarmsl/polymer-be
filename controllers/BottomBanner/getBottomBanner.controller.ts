import { Request, Response } from "express";
import BottomBanner from "../../models/BottomBanner";

const getBottomBannerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const bottomBanner = await BottomBanner.findOne();
    if (bottomBanner) {
      res.status(200).json(bottomBanner);
      return;
    } else {
      res.status(404).json({ message: "bottom banner not found" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "getting bottom banner error" });
    return;
  }
};

export default getBottomBannerController;
