import { Router } from 'express';
import { UsersController } from '../controllers/users.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const usersController = new UsersController();

// Protected routes
router.get('/usuarios', authMiddleware, usersController.getUsers);
router.post('/dados', authMiddleware, usersController.postData);

export default router;