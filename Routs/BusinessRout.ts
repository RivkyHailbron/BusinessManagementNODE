import express from 'express';
import {getBusiness,putBusiness} from '../Controllers/BuisnessController'
import {  authorizeRoles } from '../Middlewares/AuthMiddleware';

const router = express.Router();

router.get('/', authorizeRoles('admin'), getBusiness);
router.put('/:id', putBusiness);

export default router;
