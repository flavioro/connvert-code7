import { Router } from 'express'

import AuthenticateUserController from '../controllers/AuthenticateUserController'
import CreateUserController from '../controllers/CreateUserController'
import apiDebts from '../controllers/ApiDebtsController'
import debtController from '../controllers/DebtsController'

import authValidator from '../authenticate/AuthenticateValidator'

const routes = Router()
routes.post('/v1/users/auth', AuthenticateUserController.Authenticate)
routes.post('/v1/users/create', CreateUserController.CreateUser)
routes.get('/v1/clients', apiDebts.getAll)

function here() {
  console.log('test ')
}

const authRoutes = Router()
// authRoutes.get('/v1/clients', apiDebts.getAll)
authRoutes.get('/v1/clients/:id', apiDebts.getById)
authRoutes.get('/v1/clients/:id/debts', apiDebts.getDebtsByUser)

authRoutes.post('/v1/debts', debtController.Create)
authRoutes.put('/v1/debts/:id', debtController.Update)
authRoutes.delete('/v1/debts/:id', debtController.Delete)

export default routes
