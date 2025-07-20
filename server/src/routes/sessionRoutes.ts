import express from 'express';
import { getSessions } from '../controllers/sessionController';
import { auth } from '../middleware/auth';
import { getAllSessions, createSession, deleteSession } from '../controllers/sessionController';
import { requireAdmin } from '../middleware/requireAdmin';

const router = express.Router();
router.get('/', auth, getSessions);
router.get('/', getAllSessions);
router.post('/', requireAdmin, createSession);
router.delete('/:id', requireAdmin, deleteSession);

export default router;
