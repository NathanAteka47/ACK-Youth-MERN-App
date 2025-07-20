import { Request, Response } from 'express';
import Session from '../models/Session';

export const getSessions = async (req: Request, res: Response) => {
  const sessions = await Session.find().sort({ date: -1 });
  res.json(sessions);
};
