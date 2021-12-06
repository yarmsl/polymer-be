import { Request, Response } from "express";
import Banner from "../../models/Banner";

const getAllBannersController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const banners = await Banner.find();
    res.status(200).json(banners);
    return;
  } catch (e) {
    res.status(500).json({ message: "getting all banners error" });
    return;
  }
};

export default getAllBannersController;