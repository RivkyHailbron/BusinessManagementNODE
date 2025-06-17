import express from 'express';
import {
  getUsers,
  getUser,
  postUser,
  putUser
} from '../Controllers/UserController'
import { authenticateToken, authorizeRoles, isAuthorizeUser } from '../Middlewares/AuthMiddleware';


const router = express.Router();
//just admin can get all users
router.get('/', authenticateToken, isAuthorizeUser ,authorizeRoles('admin'), getUsers);
//get user by email, only the user himself or admin can get his details
router.get('/:email', authenticateToken, isAuthorizeUser, getUser);
router.post('/', authenticateToken, isAuthorizeUser, postUser);
router.put('/:email', authenticateToken, isAuthorizeUser, putUser);

export default router;
