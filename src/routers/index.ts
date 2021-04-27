import { Router } from 'express'

import AuthenticateUserController from '../controllers/AuthenticateUserController'
import CreateUserController from '../controllers/CreateUserController'
import apiDebts from '../controllers/ApiDebtsController'

import authValidator from '../authenticate/AuthenticateValidator'

const routes = Router()
routes.post('v1/users/auth', AuthenticateUserController.Authenticate)
routes.post('v1/users/create', CreateUserController.CreateUser)

const authRoutes = Router()
authRoutes.get('v1/clients', authValidator, apiDebts.getAll, )
authRoutes.get('v1/clients/:id', authValidator, apiDebts.getById)
authRoutes.get('v1/clients/:id/debts', authValidator, apiDebts.getDebtsByUser)

export default routes

