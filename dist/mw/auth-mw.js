"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authGuardMiddleware = void 0;
const jwt = require('jsonwebtoken');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authGuardMiddleware = (req, res, next) => {
    if (req.method === "OPTIONS")
        next();
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';
        if (!token) {
            return res.status(400).json({ message: "Пользователь не авторизован" });
        }
        res.locals.user = jwt.verify(token, process.env.JWT_KEY);
        next();
    }
    catch (e) {
        console.log(e);
        res.status(403).json({ message: "Пользователь не авторизован" });
    }
};
exports.authGuardMiddleware = authGuardMiddleware;
