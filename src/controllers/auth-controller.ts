import {Request, Response} from "express";
import {RoleModel} from "../dbModels/Role";
import {UserModel} from "../dbModels/User";

const bcrypt = require('bcryptjs');


export const authController = {
    async registration(req: Request, res: Response) {
        try {
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

        } catch (e) {
            console.log(e)
            res.sendStatus(400)
                .json({message: 'Login error occurred'})
        }
    },
    async getUsers(req: Request, res: Response) {
        try {
            // // Создаем две роли. Обычный юзер и админ. Костыль т.к. мы не выносим это в отдельный файл здесь
            // const userRole = new RoleModel()
            // const adminRole = new RoleModel({value: "ADMIN"})
            // await userRole.save()
            // await adminRole.save()

            res.json("Our server works")
        } catch (e) {
            console.log(e)
            res.sendStatus(400)
                .json({message: 'Get users error occurred'})
        }
    }

}