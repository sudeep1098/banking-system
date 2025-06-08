import { Router } from 'express';
import { createGovernmentId } from '../controllers/governmentIdController';

const router = Router();

router.post('/create', createGovernmentId);

export default router;
