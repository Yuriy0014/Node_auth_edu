import {NextFunction, Request, Response} from "express";
const jwt = require('jsonwebtoken');

import dotenv from 'dotenv'
dotenv.config()

export const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === "OPTIONS") next();

    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';

        if(!token)  {
            return res.status(400).json({message: "Пользователь не авторизован"})
        }

        res.locals.user = jwt.verify(token, process.env.JWT_KEY,);
        next()
    } catch (e) {
        console.log(e)
        res.status(403).json({message: "Пользователь не авторизован"})
    }
}