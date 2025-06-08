import { Router } from 'express';
import { assignRolesToUser, getUser } from '../controllers/userController';

const router = Router();

router.get('/:id', getUser);
router.post('/:id/assign-roles', assignRolesToUser);

export default router;
