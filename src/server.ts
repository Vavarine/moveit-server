import express, { Request, Response } from 'express'
import path from 'path'
import cors from 'cors'
import 'express-async-errors'

import './database/connection'
import multer from 'multer'
import uploadConfig from './config/multer'
import publicRouter from './routes'
import errorHandler from './error/errorHandler'

const app = express()
const upload = multer(uploadConfig)

app.use(cors())
app.use(express.json())
app.use(publicRouter)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
// app.post('/upload', upload.single('profile_image'), (req: Request, res: Response) => { res.json({ message: 'uploadado' }) })
app.use(errorHandler)

app.listen(3333)
