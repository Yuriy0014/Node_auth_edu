"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth-controller");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter.post('/registration', auth_controller_1.authController.registration);
exports.authRouter.post('/login', auth_controller_1.authController.login);
exports.authRouter.get('/users', auth_controller_1.authController.getUsers);
