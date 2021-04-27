import { Router } from 'express'

import AuthenticateUserController from '../controllers/AuthenticateUserController'
import CreateUserController from '../controllers/CreateUserController'

const routes = Router()
routes.post('/users/login', AuthenticateUserController.Authenticate)
routes.post('/users/register', CreateUserController.CreateUser)

export default routes
