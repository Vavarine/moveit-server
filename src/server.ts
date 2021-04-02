import express, { Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
import 'express-async-errors'

import './database/connection'
import multer from 'multer'
import uploadConfig from './config/multer'
import router from './routes'
import errorHandler from './error/errorHandler'
import authenticator from './middlewares/authenticator'

const app = express()
const upload = multer(uploadConfig)

app.use(cors())
app.use(express.json())
app.use(authenticator)
app.use('/api', router)
app.use('/public/uploads', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

app.listen(3333)
