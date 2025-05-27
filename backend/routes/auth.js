import express from 'express';
import { register, login, perfil } from '../controllers/authController.js';
import verifyToken from '../middleware/verifyToken.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, perfil)

export default router;
