import {Request, Response} from "express";
import {RoleModel} from "../dbModels/Role";
import {UserModel} from "../dbModels/User";
import {validationResult} from "express-validator";
import {ObjectId} from "mongodb";

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

export const authController = {
    async registration(req: Request, res: Response) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({message: 'Ошибка при регистрации ', errors})
            const {username, password} = req.body
            const candidate = await UserModel.findOne({username})

            if (candidate) return res.status(400).json('User with such username is already existed')

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            const userRole = await RoleModel.findOne({value: 'USER'})
            const user = new UserModel({username, password: hashPassword, roles: [userRole?.value]})
            await user.save()
            return res.json({message: 'The user was successfully registered'})

        } catch (e) {
            console.log(e)
            res.sendStatus(400)
                .json({message: 'Registration error occurred'})
        }
    },
    async login(req: Request, res: Response) {
        try {
            const {username, password} = req.body
            const user = await UserModel.findOne({username})
            if (!user) return res.status(400).json({message: `Username ${username} does not exist`})
            const validPassword =    bcrypt.compareSync(password, user.password)
            console.log(validPassword)
            if (!validPassword) return res.status(400).json({message: `Login or password is wrong`})

            const token = this.generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.sendStatus(400).json({message: 'Login error occurred'})
        }
    },
    async getUsers(req: Request, res: Response) {
        try {
            res.json("Our server works")
        } catch (e) {
            console.log(e)
            res.sendStatus(400)
                .json({message: 'Get users error occurred'})
        }
    },
    generateAccessToken(id: ObjectId, roles: Array<string>) {
        const payload = {
            id,
            roles
        };


        return jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '24h'})
    }

}