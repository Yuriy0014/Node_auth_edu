"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth-controller");
const express_validator_1 = require("express-validator");
const auth_mw_1 = require("../mw/auth-mw");
const role_mw_1 = require("../mw/role-mw");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter.post('/registration', [
    (0, express_validator_1.check)('username', 'The name can not be empty').trim().notEmpty(),
    (0, express_validator_1.check)('password', "The password should contain from 4 to 18 symbols").trim().isLength({ min: 4, max: 18 })
], auth_controller_1.authController.registration);
exports.authRouter.post('/login', auth_controller_1.authController.login.bind(auth_controller_1.authController)); // забиндили контекст иначе this не работал
exports.authRouter.get('/users', auth_mw_1.authGuardMiddleware, (0, role_mw_1.roleGuardMiddleware)(['USER']), auth_controller_1.authController.getUsers);
