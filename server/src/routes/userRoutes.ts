import { Router } from 'express';
import { requireAdmin } from '../middleware/auth';
import User from '../models/User';

router.get('/', requireAdmin, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const router = Router();