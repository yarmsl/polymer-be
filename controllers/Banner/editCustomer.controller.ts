import { Request, Response } from "express";
import Banner from "../../models/Banner";

const editBannerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { bannerId } = req.params;
    const { text } = req.body;

    const editedBanner = await Banner.findByIdAndUpdate(
      bannerId,
      { text },
      { new: true }
    );
    res.status(200).json(editedBanner);
    return;
  } catch (e) {
    res.status(500).json({ message: "editing banner error" });
    return;
  }
};

export default editBannerController;
