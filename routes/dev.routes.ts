import { Request, Response, Router } from "express";
import User from "../models/User";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const user = await User.find();

    res.status(200).json(user);
    return;
  } catch (e) {
    res.status(500).json({ message: `Error: ${e}` });
    return;
  }
});

export default router;
