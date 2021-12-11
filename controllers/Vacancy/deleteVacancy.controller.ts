import { Request, Response } from "express";
import User from "../../models/User";
import Vacancy from "../../models/Vacancy";

const deleteVacancyController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { vacancyId } = req.params;
    const removingVacancy = await Vacancy.findById(vacancyId);
    if (removingVacancy) {
      await User.findByIdAndUpdate(removingVacancy.author, {
        $pull: { vacancies: removingVacancy._id },
      });

      await removingVacancy.delete();
      res.status(200).json({ message: "vacancy successfully removed" });
      return;
    } else {
      res.status(404).json({ message: "vacancy not found" });
      return;
    }
  } catch (e) {
    res.status(500).json({ message: "remove vacancy error" });
    return;
  }
};

export default deleteVacancyController;
