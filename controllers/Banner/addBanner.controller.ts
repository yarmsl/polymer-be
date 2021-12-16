import { Request, Response } from "express";
import Banner from "../../models/Banner";

const addBannerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { userId } = req.body.user;
    const image = req.file != null ? req.file.path : "";
    const { text, order } = req.body;

    const banner = new Banner({
      author: userId,
      image,
      text,
      order,
    });
    await banner.save();

    res.status(201).json(banner);
    return;
  } catch (e) {
    res.status(500).json({ message: "adding banner error" });
    return;
  }
};

export default addBannerController;
