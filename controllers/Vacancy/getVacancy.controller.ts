import { Request, Response } from "express";
import Vacancy from "../../models/Vacancy";

const getAllVacanciesController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.body?.user?.userId;
  try {
    const vacancies = await Vacancy.find().populate("author");
    if (userId) {
      res.status(200).json(vacancies);
      return;
    } else {
      const vacanciesFE = vacancies?.map((v) => {
        return {
          _id: v._id,
          title: v.title,
          requirements: v.requirements,
          wage: v.wage,
        };
      });
      res.status(200).json(vacanciesFE);
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "getting all vacancies error" });
    return;
  }
};

export default getAllVacanciesController;
