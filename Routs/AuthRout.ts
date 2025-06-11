// routes/AuthRoute.ts
import express from 'express';
const router = express.Router();

import { postSignUp, postSignIn } from '../Controllers/AuthController';

router.post('/sign-up', postSignUp);
router.post('/sign-in', postSignIn);

export default router;
