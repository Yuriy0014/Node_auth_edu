import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";

import dotenv from 'dotenv'

dotenv.config()

export const roleGuardMiddleware = (roles: any) => {
    return function (req: Request, res: Response, next: NextFunction) {

        if (req.method === "OPTIONS") next();

        try {
            const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';

            if (!token) {
                return res.status(401).json({message: "Аутентификация не удалась"})
            }
            if (process.env.JWT_KEY) {
                let user = jwt.verify(token, process.env.JWT_KEY,);
                //
                if (typeof user !== "string") {
                    let {roles: userRoles} = user
                    let hasRole = false
                    userRoles.map((i: any) => {
                        if (roles.includes(i)) hasRole = true
                    })

                    if (!hasRole) {
                        res.status(403).json({message: "У Вас нет доступа"})

                    }

                } else {
                    res.status(401).json({message: "Аутентификация не удалась"})
                }
            }
            next()
        }
catch
    (e)
    {
        console.log(e)
        res.status(403).json({message: "Пользователь не авторизован"})
    }


}

}