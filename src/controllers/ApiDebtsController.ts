import { Request, Response } from 'express'

import { OK } from '../tools/httpStatus'
import apiUsers from '../services/ApiUsersService'
import debtsService from '../services/DebtsService'

class UserController {

  public async getAll (request: Request, response: Response): Promise<Response> {
    const usersApi = await apiUsers.getUsers()

    for (const client of usersApi) {
      client.valueTotal = 0
      const debts = await debtsService.getDebtsByUsersAll(client.id)
      const values = debts.map(item => item.value)

      if (values.length > 0) {
        client.valueTotal = values.reduce((v1, v2) => v1 + v2)
      }
    }

    return response.status(OK).json(usersApi)
  }

  public async getById (request: Request, response: Response): Promise<Response> {
    const user = await apiUsers.getUserById(request.params.id)
    
    return response.status(OK).json(user)
  }

  public async getDebtsByUser (request: Request, response: Response): Promise<Response> {
    const pagination = { limit: request.query.limit || 5, page: request.query.page || 1 }
    const debtUser = await debtsService.getDebtsByUser(request.params.id, pagination)
    
    return response.status(OK).json(debtUser)
  }
}
export default new UserController()
