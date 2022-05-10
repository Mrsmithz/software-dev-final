import express, {Request, Response, NextFunction, Application} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import { httpRequestDurationMicroseconds } from './src/utils/metrics'
import responseTime from 'response-time'
import {register} from './src/controller/vaccine.controller'
import { IRegister } from './src/types/register.type'
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
app.post('/register', async (req : Request , res : Response, next : NextFunction) => {
    const data = req.body as IRegister
    const result = await register(data)
    res.status(201).send(result)
})
export default app