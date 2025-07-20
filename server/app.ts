import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import sessionRoutes from './routes/sessionRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);

export default app;
