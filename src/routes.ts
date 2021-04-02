import { Router } from "express"
import multer from 'multer'

import UserController from "./controllers/UserController"
import UsersController from './controllers/UserController'
import uploadConfig from './config/multer'

const router = Router({})
const upload = multer(uploadConfig)

router.get('/users', UserController.index)
router.get('/users/by-level', UserController.indexByLevel)
router.get('/users/:id', UserController.show)
router.post('/public/users/login', UserController.login)
router.post('/public/users', upload.single('profile_image'), UsersController.create)
router.post('/put', upload.single('profile_image'), UsersController.create)

export default router
