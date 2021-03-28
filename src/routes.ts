import { Router } from "express"
import UserController from "./controllers/UserController"
import UsersController from './controllers/UserController'

const publicRouter = Router()

publicRouter.get('/users', UserController.index)
publicRouter.get('/users/by-level', UserController.indexByLevel)
publicRouter.get('/users/:id', UserController.show)
publicRouter.post('/users', UsersController.create)

export default publicRouter
