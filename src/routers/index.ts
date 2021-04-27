import { Router } from 'express'

import userController from '../controllers/user-controller'

const routes = Router()
routes.post('/users/login', userController.login)
routes.post('/users/register', userController.register)

export default routes
