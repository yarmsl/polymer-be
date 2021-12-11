import { Request, Response, Router } from "express";
import User from "../models/User";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const user = await User.findOne();
    if (user) {
      res.status(200).json({ message: "server and db ok" });
      return;
    } else {
      res.status(500).json({ message: "db off or users is empty" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: `Error: ${e}` });
    return;
  }
});

export default router;
