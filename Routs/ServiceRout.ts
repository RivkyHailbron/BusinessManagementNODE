
import exspress from 'express';
const router = exspress.Router();
import {
    getServices,
    getService,
    postService,
    putService,
    deleteService
} from '../Controllers/ServiceController';
import { authenticateToken, authorizeRoles } from '../Middlewares/AuthMiddleware';


router.get('/', authenticateToken, getServices);
router.get('/:id', authenticateToken, getService);
router.post('/', authenticateToken, authorizeRoles('admin'), postService);
router.put('/:id', authenticateToken, authorizeRoles('admin'), putService);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), deleteService);

export default router;
