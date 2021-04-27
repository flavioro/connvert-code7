import { Request, Response } from 'express'

import validate from '../validators/validate'
import userValidator, { loginValidator } from '../validators/userValidator'
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR, OK } from '../tools/httpStatus'
import userService from '../services/AuthenticateUserService'
import createUser from '../services/CreateUserService'

export default class UserController {
  public static async login (request: Request, response: Response): Promise<Response> {
    try {
      let data = await validate(loginValidator, request.body)
      if (data.errors) {
        return response.status(BAD_REQUEST).json(data.errors)
      }
      data = await userService.authenticate(data.item)
      return response.status(OK).json(data)
    } catch (error) {
      return response.status((error.status || INTERNAL_SERVER_ERROR)).json(error)
    }
  }

  public static async register (request: Request, response: Response): Promise<Response> {
    let data = await validate(userValidator, request.body)
    if (data.errors) {
      return response.status(BAD_REQUEST).json(data.errors)
    }
    try {
      data = await createUser.createUser(data.item)
      return response.status(CREATED).json(data)
    } catch (error) {
      response.status(error.status).json(error)
    }
  }
}
