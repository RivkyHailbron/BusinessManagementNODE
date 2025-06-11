
import exspress from 'express';
const router = exspress.Router();
import {
    getServices,
    getService,
    postService,
    putService,
    deleteService
} from '../Controllers/ServiceController';
import { authorizeRoles } from '../Middlewares/AuthMiddleware';


router.get('/', getServices);
router.get('/:id', getService);
router.post('/', authorizeRoles('admin'), postService);
router.put('/:id', authorizeRoles('admin'), putService);
router.delete('/:id', authorizeRoles('admin'), deleteService);

export default router;
