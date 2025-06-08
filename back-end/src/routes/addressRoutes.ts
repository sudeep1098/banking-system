import { Router } from 'express';
import { createAddress } from '../controllers/addressController';

const router = Router();

router.post('/create', createAddress);

export default router;
