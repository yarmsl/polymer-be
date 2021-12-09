import { NextFunction, Request, Response } from "express";
import multer from "multer";
import {existsSync, mkdirSync} from "fs";

const fileUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.method === "OPTIONS") {
    return next();
  }
  const { user } = req.body;

  const path = 'uploads/presentation/';
  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path);
    },
    filename: (req, file, cb) => {
      const uniqName = file.originalname;
      cb(null, uniqName);
    },
  });

  const upload = multer({ storage: storage });
  const middleware = upload.single("file");
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

export default fileUpload;