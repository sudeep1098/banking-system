import { Router } from 'express';
import {
    createRole,
    getRoles,
    getRoleById,
    updateRole,
} from '../controllers/roleController';

const router = Router();

router.post('/create', createRole);
router.get('/', getRoles);
router.get('/:id', getRoleById);
router.put('/update/:id', updateRole);

export default router;
