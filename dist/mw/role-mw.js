"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleGuardMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const roleGuardMiddleware = (roles) => {
    return function (req, res, next) {
        if (req.method === "OPTIONS")
            next();
        try {
            const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
            if (!token) {
                return res.status(401).json({ message: "Аутентификация не удалась" });
            }
            if (process.env.JWT_KEY) {
                let user = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
                //
                if (typeof user !== "string") {
                    let { roles: userRoles } = user;
                    let hasRole = false;
                    userRoles.map((i) => {
                        if (roles.includes(i))
                            hasRole = true;
                    });
                    if (!hasRole) {
                        res.status(403).json({ message: "У Вас нет доступа" });
                    }
                }
                else {
                    res.status(401).json({ message: "Аутентификация не удалась" });
                }
            }
            next();
        }
        catch (e) {
            console.log(e);
            res.status(403).json({ message: "Пользователь не авторизован" });
        }
    };
};
exports.roleGuardMiddleware = roleGuardMiddleware;
