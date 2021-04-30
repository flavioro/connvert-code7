import { Router } from 'express'

import AuthenticateUserController from '../controllers/AuthenticateUserController'
import CreateUserController from '../controllers/CreateUserController'
import apiDebts from '../controllers/ApiDebtsController'
import debtController from '../controllers/DebtsController'

import authValidator from '../authenticate/AuthenticateValidator'

const routes = Router()
routes.post('/v1/users/auth', AuthenticateUserController.Authenticate)
routes.post('/v1/users/create', CreateUserController.CreateUser)

routes.get('/v1/clients', authValidator, apiDebts.getAll)
routes.get('/v1/clients/:id', authValidator, apiDebts.getById)
routes.get('/v1/clients/:id/debts', authValidator, apiDebts.getDebtsByUser)

routes.post('/v1/debts', authValidator, debtController.Create)
routes.put('/v1/debts/:id', authValidator, debtController.Update)
routes.delete('/v1/debts/:id', authValidator, debtController.Delete)

export default routes
