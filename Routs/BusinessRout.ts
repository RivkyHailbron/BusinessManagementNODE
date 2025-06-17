import express from 'express';
import {getBusiness,putBusiness} from '../Controllers/BuisnessController'
import {  authenticateToken, authorizeRoles } from '../Middlewares/AuthMiddleware';

const router = express.Router();

router.get('/', authenticateToken, authorizeRoles('admin'), getBusiness);
router.put('/:id',authenticateToken, putBusiness);

export default router;
