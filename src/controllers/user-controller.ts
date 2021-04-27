import { Request, Response } from 'express'
import validate from '../validators/validate'
import userValidator, { loginValidator } from '../validators/user-validator'
import Const from '../utils/const'
import userService from '../services/user-service'

export default class UserController {
  public static async login (request: Request, response: Response): Promise<Response> {
    try {
      let data = await validate(loginValidator, request.body)
      if (data.errors) {
        return response.status(Const.httpStauts.BAD_REQUEST).json(data.errors)
      }
      data = await userService.login(data.item)
      return response.status(Const.httpStauts.OK).json(data)
    } catch (error) {
      return response.status((error.status || 500)).json(error)
    }
  }

  public static async register (request: Request, response: Response): Promise<Response> {
    let data = await validate(userValidator, request.body)
    if (data.errors) {
      return response.status(Const.httpStauts.BAD_REQUEST).json(data.errors)
    }
    try {
      data = await userService.saveUser(data.item)
      return response.status(Const.httpStauts.CREATED).json(data)
    } catch (error) {
      response.status(error.status).json(error)
    }
  }
}
