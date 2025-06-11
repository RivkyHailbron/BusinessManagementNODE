import express from 'express';
import {
  getUser,
  postUser,
  putUser
} from '../Controllers/UserController'
import { authorizeRoles, isAuthorizeUser } from '../Middlewares/AuthMiddleware';


const router = express.Router();

router.get('/:email', isAuthorizeUser, getUser);
router.post('/', isAuthorizeUser, postUser);
router.put('/:email', isAuthorizeUser, putUser);

export default router;
