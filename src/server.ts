import express, { Request, Response } from 'express'
import cors from 'cors'
import 'express-async-errors'

import './database/connection'
import publicRouter from './routes'
import errorHandler from './error/errorHandler'

const app = express()

app.use(cors())
app.use(express.json())
app.use(publicRouter)
app.get('/', (req: Request, res: Response) => { res.json({ message: 'Olá, Mundo!' }) })
app.use(errorHandler)

app.listen(3333)
