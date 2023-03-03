import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import bcrypt from 'bcrypt';

import { User } from '../User.model';

export const signUpController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role } = req.body.user;
    if (role !== 'admin') {
      res.status(400).json({ message: 'not enough rights' });
      return;
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const err = errors.mapped();
      res.status(400).json({
        message: err?.email?.msg || err?.password?.msg || err?.name.msg || 'invalid data',
      });
      return;
    }
    const { email, name, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      res.status(400).json({ message: 'user exists' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ email, name, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: `user ${user.email} successfully created` });
    return;
  } catch (e) {
    res.status(500).json({ message: e instanceof Error ? e.message : 'signup error' });
    return;
  }
};
