import mongoose from 'mongoose';

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
  resetToken: String,
  resetExpires: Date,
  role: { type: String, default: 'user' },
});
const { Schema } = mongoose;

export default mongoose.model('User', userSchema);
