import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User';

dotenv.config();
mongoose.connect(process.env.MONGO_URI || '');

const seedAdmin = async () => {
  const existing = await User.findOne({ username: 'ACK47' });
  if (existing) {
    console.log('Admin already exists');
    process.exit();
  }

  const hashed = await bcrypt.hash('254254', 10);
  const admin = new User({
    name: 'ACK Admin',
    email: 'ackadmin@example.com',
    username: 'ACK47',
    password: hashed,
    role: 'admin',
  });

  await admin.save();
  console.log('✅ Admin user created');
  process.exit();
};

seedAdmin();
