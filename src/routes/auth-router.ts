import {Router} from "express";
import {authController} from "../controllers/auth-controller";
import {check} from "express-validator";

export const authRouter = Router({})

authRouter.post('/registration', [
    check('username', 'The name can not be empty').trim().notEmpty(),
    check('password', "The password should contain from 4 to 18 symbols").trim().isLength({min: 4, max: 18})],
    authController.registration)
authRouter.post('/login', authController.login)
authRouter.get('/users', authController.getUsers)