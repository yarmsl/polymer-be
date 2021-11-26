import { NextFunction, Request, Response } from "express";
import multer from "multer";
import fs from "fs";

const projectUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.method === "OPTIONS") {
    return next();
  }
  const { user } = req.body;

  const path = 'uploads/project/';
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path);
    },
    filename: (req, file, cb) => {
      const uniqName = `${file.originalname}_${Date.now()}.svg`;
      cb(null, uniqName);
    },
  });

  const upload = multer({ storage: storage });
  const middleware = upload.array("images");
  return middleware(req, res, () => {
    try {
      req.body.user = user;
      next();
    } catch (e) {
      next(e);
      return;
    }
  });
};

export default projectUpload;