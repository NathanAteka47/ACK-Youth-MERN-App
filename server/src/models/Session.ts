import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
  title: String,
  description: String,
  videoUrl: String,
  date: Date,
  posterImage: String,
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model('Session', sessionSchema);
