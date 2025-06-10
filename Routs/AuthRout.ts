import router from 'express';
const myRouter =router.Router()

const authController = require('../Controllers/AuthController');
const { postSignUp, postSignIn } = authController;

myRouter.post('/sign-up', postSignUp);
myRouter.post('/sign-in', postSignIn);

module.exports = router;
