import express, {Request, Response, NextFunction, Application} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import prometheusClient from 'prom-client'
import { httpRequestDurationMicroseconds } from './src/utils/metrics'
import responseTime from 'response-time'
import {createUser} from './src/controller/user.controller'

dotenv.config({path: `.env.${process.env.NODE_ENV}`})

const app : Application = express()


app.use(responseTime((req : Request, res : Response, time : number) => {
    httpRequestDurationMicroseconds.observe({
        method:req.method,
        route: req.path,
        code: res.statusCode
    }, time)
}))
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())


app.get('/health', async (req : Request , res : Response, next : NextFunction) => {
    res.send({
        status:'UP'
    })
})
app.post('/user', async (req : Request , res : Response, next : NextFunction) => {
    const {firstName, lastName, email} = req.body
    const user = await createUser(firstName, lastName, email)
    res.status(201).send(user)
})
export default app