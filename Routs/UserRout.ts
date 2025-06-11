import express from 'express';
import {
  getUser,
  postUser,
  putUser
} from '../Controllers/UserController'

const router = express.Router();

router.get('/:email', getUser);
router.post('/', postUser);
router.put('/:email', putUser);

export default router;
