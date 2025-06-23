import { Router } from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import addressRoutes from './addressRoutes';
import accountRoutes from './accountRoutes';
import governmentIdRoutes from './governmentIdRoutes';
import roleRoutes from './roleRoutes';
import permissionRoutes from './permissionRoutes';
import transactionRoutes from './transactionRoutes';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.use('/auth', authRoutes);

// Protected routes
router.use('/users', userRoutes);
router.use('/addresses', protect, addressRoutes);
router.use('/accounts', protect, accountRoutes);
router.use('/governmentIds', protect, governmentIdRoutes);
router.use('/roles', roleRoutes);
router.use('/permissions', permissionRoutes);

// Transaction routes
router.use('/transaction', protect, transactionRoutes);

export default router;
