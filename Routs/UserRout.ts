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
router.get('/', isAuthorizeUser ,authorizeRoles('admin'), getUsers);
//get user by email, only the user himself or admin can get his details
router.get('/:email', isAuthorizeUser, getUser);
router.post('/', isAuthorizeUser, postUser);
router.put('/:email', isAuthorizeUser, putUser);

export default router;
