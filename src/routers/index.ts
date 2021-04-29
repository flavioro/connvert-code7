import { Router } from 'express'

import AuthenticateUserController from '../controllers/AuthenticateUserController'
import CreateUserController from '../controllers/CreateUserController'
import apiDebts from '../controllers/ApiDebtsController'
import debtController from '../controllers/DebtsController'

import authValidator from '../authenticate/AuthenticateValidator'

const routes = Router()
routes.post('/v1/users/auth', AuthenticateUserController.Authenticate)
routes.post('/v1/users/create', CreateUserController.CreateUser)

function here() {
  console.log('CreateUser ')
}

const authRoutes = Router()
authRoutes.get('/v1/clients', authValidator, apiDebts.getAll)
authRoutes.get('/v1/clients/:id', authValidator, apiDebts.getById)
authRoutes.get('/v1/clients/:id/debts', authValidator, apiDebts.getDebtsByUser)

authRoutes.post('/debts', authValidator, debtController.Create)
authRoutes.put('/debts/:id', authValidator, debtController.Update)
authRoutes.delete('/debts/:id', authValidator, debtController.Delete)

export default routes
