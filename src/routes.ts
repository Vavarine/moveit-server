import { Router } from "express"
import multer from 'multer'

import UserController from "./controllers/UserController"
import UsersController from './controllers/UserController'
import uploadConfig from './config/multer'

const publicRouter = Router()
const upload = multer(uploadConfig)

publicRouter.get('/users', UserController.index)
publicRouter.get('/users/by-level', UserController.indexByLevel)
publicRouter.get('/users/:id', UserController.show)
publicRouter.post('/users', upload.single('profile_image'), UsersController.create)

export default publicRouter
