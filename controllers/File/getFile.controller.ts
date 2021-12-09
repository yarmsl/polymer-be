import { Request, Response } from "express";
import PresentationFile from "../../models/PresentationFile";

const getFileController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.body?.user?.userId;
  try {
    const file = await PresentationFile.find();
    if (Array.isArray(file) && file.length > 0) {
      if (userId) {
        res.status(200).json(file[0]);
        return;
      } else {
        res.status(200).json({ file: file[0].file });
        return;
      }
    } else {
      res.status(400).json({ message: "file not found" });
      return
    }
  } catch (e) {
    res.status(500).json({ message: "getting file error" });
    return;
  }
};

export default getFileController;
