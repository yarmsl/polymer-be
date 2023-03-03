import { Request, Response } from 'express';

import { User } from '../User.model';

export const editUserController = async (req: Request, res: Response) => {
  try {
    const { name, role, id } = req.body;
    await User.findByIdAndUpdate(id, { name: name, role: role });
    return res.status(200).json({ message: 'user successfully edited' });
  } catch (e) {
    return res.status(500).json({ message: 'edit user error' });
  }
};
