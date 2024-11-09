// routes/userRoutes.js
import express from 'express';
import { getUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile/:id', getUserProfile);

export default router;
