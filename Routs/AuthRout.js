const express = require('express');
const router = express.Router();
const authController = require('../Controllers/AuthController');
const { postSignUp, postSignIn } = authController;

router.post('/sign-up', postSignUp);
router.post('/sign-in', postSignIn);

module.exports = router;
