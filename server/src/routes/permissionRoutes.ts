import { Router } from 'express';
import {
    createPermission,
    deletePermission,
    getPermissions,
    updatePermission,
} from '../controllers/permissionController';

const router = Router();

router.post('/create', createPermission);
router.get('/', getPermissions);
router.put('/:id', updatePermission);
router.delete('/:id', deletePermission);

export default router;
