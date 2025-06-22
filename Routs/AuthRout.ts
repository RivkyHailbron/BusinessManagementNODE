// routes/AuthRoute.ts
import express from 'express';
const router = express.Router();

import { postSignUp, postSignIn } from '../Controllers/AuthController';
import { postGoogleSignIn } from '../Controllers/AuthController';

router.post('/sign-up', postSignUp);
router.post('/sign-in', postSignIn);
router.post('/google-sign-in', postGoogleSignIn);


export default router;
