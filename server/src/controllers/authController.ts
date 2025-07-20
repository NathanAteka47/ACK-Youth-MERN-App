import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { Request, Response } from 'express';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: 'Email already in use' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d' });
    res.json({ token, user });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const { name, email, password } = req.body;
  const avatar = req.file?.path;

  const updates: any = { name, email };
  if (password) updates.password = await bcrypt.hash(password, 10);
  if (avatar) updates.avatar = avatar;

  const user = await User.findByIdAndUpdate(userId, updates, { new: true });
  res.json({ user });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'No user with that email' });

  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.resetExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  // Send email logic (e.g. nodemailer)
  res.json({ message: 'Reset link sent to your email' });
};


export const getProfile = async (req: Request, res: Response) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });  
  } catch {
    res.status(500).json({ error: 'Server error' });
  } 
}