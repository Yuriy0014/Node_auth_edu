import {authRouter} from "./routes/auth-router";

const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/auth',authRouter)

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://ylogachev2019:qwerty123@cluster0.jb9egoo.mongodb.net/?retryWrites=true&w=majority');
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()