"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const Role_1 = require("../dbModels/Role");
const User_1 = require("../dbModels/User");
const express_validator_1 = require("express-validator");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
exports.authController = {
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = (0, express_validator_1.validationResult)(req);
                if (!errors.isEmpty())
                    return res.status(400).json({ message: 'Ошибка при регистрации ', errors });
                const { username, password } = req.body;
                const candidate = yield User_1.UserModel.findOne({ username });
                if (candidate)
                    return res.status(400).json('User with such username is already existed');
                const salt = bcrypt.genSaltSync(10);
                const hashPassword = bcrypt.hashSync(password, salt);
                const userRole = yield Role_1.RoleModel.findOne({ value: 'USER' });
                const user = new User_1.UserModel({ username, password: hashPassword, roles: [userRole === null || userRole === void 0 ? void 0 : userRole.value] });
                yield user.save();
                return res.json({ message: 'The user was successfully registered' });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(400)
                    .json({ message: 'Registration error occurred' });
            }
        });
    },
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield User_1.UserModel.findOne({ username });
                if (!user)
                    return res.status(400).json({ message: `Username ${username} does not exist` });
                const validPassword = bcrypt.compareSync(password, user.password);
                console.log(validPassword);
                if (!validPassword)
                    return res.status(400).json({ message: `Login or password is wrong` });
                const token = this.generateAccessToken(user._id, user.roles);
                return res.json({ token });
            }
            catch (e) {
                console.log(e);
                res.sendStatus(400).json({ message: 'Login error occurred' });
            }
        });
    },
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty())
                return res.status(400).json({ message: 'Ошибка при регистрации ', errors });
            try {
                const users = yield User_1.UserModel.find();
                res.json(users);
            }
            catch (e) {
                console.log(e);
                res.sendStatus(400)
                    .json({ message: 'Get users error occurred' });
            }
        });
    },
    generateAccessToken(id, roles) {
        const payload = {
            id,
            roles
        };
        return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '24h' });
    }
};
