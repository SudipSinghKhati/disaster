import express from 'express';
import userController from '../controller/user';


const router = express.Router();


router.post('/signUp', userController.SignUp);


router.post('/signIn', userController.SignIn);


export = router;