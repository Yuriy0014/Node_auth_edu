import {authRouter} from "./routes/auth-router";

const express = require('express')
const mongoose = require('mongoose')

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000
const mongoUri = process.env.MONGO_URL
app.use(express.json())

app.use('/auth',authRouter)

const start = async () => {
    try {
        await mongoose.connect(mongoUri);
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()