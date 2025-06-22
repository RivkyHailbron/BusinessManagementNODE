import express from 'express';
import {getBusiness,putBusiness} from '../Controllers/BuisnessController'
import {  authenticateToken, authorizeRoles } from '../Middlewares/AuthMiddleware';

const router = express.Router();

router.get('/', getBusiness);
router.put('/:id',authenticateToken,authorizeRoles('admin'), putBusiness);

export default router;
