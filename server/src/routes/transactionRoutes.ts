import { Router } from 'express';
import { transferHandler } from '../controllers/transactionController';

const router = Router();

router.post('/transfer', transferHandler)

export default router;
