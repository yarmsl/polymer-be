import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import User from "../models/User";
import config from "config";
import authCheck from "../middleware/auth.middleware";
import { RoleTypes } from "../types/types";

const token = (id: string, role: RoleTypes): string =>
  jwt.sign({ userId: id, role: role }, config.get("jwtSecret"), {
    expiresIn: "1h",
  });

const router = Router();

router.post(
  "/signin",
  [
    check("email", "enter correct email").normalizeEmail().isEmail(),
    check("password", "enter pass").exists().notEmpty(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const err = errors.mapped();
        res.status(400).json({
          message: err?.email?.msg || err?.password?.msg || "invalid data",
        });
        return;
      }
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "user not found" });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(400).json({ message: "password is incorrect" });
        return;
      }

      res.json({
        name: user.name,
        token: token(user._id, user.role),
        role: user.role,
        articles: user.articles,
        companies: user.companies,
        presentationFile: user.presentationFile,
        productions: user.productions,
        projects: user.projects,
        steps: user.steps,
        stories: user.stories,
        storyArticles: user.storyArticles,
        tags: user.tags,
        vacancies: user.vacancies,
      });
    } catch (e) {
      res.status(500).json({ message: "signin error" });
      return;
    }
  }
);

router.get("/", authCheck, async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(400).json({ message: "user not found" });
      return;
    }
    res.json({
      name: user.name,
      role: user.role,
      articles: user.articles,
      companies: user.companies,
      presentationFile: user.presentationFile,
      productions: user.productions,
      projects: user.projects,
      steps: user.steps,
      stories: user.stories,
      storyArticles: user.storyArticles,
      tags: user.tags,
      vacancies: user.vacancies,
    });
  } catch (e) {
    res.status(500).json({ message: "checkauth error" });
    return;
  }
});

export default router;
