/* eslint-disable space-before-function-paren */
import { Request, Response } from 'express'
import debService from '../services/DebtsService'
import { OK } from '../tools/httpStatus'

class DebtsController {
  public async Create(request: Request, response: Response): Promise<Response> {
    try {
      let debt = await debService.ValidateDebt(request.body)
      debt = await debService.CreateDebt(debt)

      return response.status(OK).json(debt)
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  public async Update(request: Request, response: Response): Promise<Response> {
    try {
      let data = await debService.ValidateDebt(request.body)
      data = await debService.UpdateDebt(request.params.id, data)

      return response.status(OK).json(data)
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }

  public async Delete(request: Request, response: Response): Promise<Response> {
    try {
      const data = await debService.DeleteDebt(request.params.id)

      return response.status(OK).json(data)
    } catch (error) {
      return response.status(error.status).json(error)
    }
  }
}

export default new DebtsController()
