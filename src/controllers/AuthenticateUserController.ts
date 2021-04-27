import { Request, Response } from 'express'

import userService from '../services/AuthenticateUserService'
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from '../tools/httpStatus'
import validate from '../validators/validate'
import { AuthenticateValidator } from '../validators/userValidator'

export default class UserController {
  public static async Authenticate (request: Request, response: Response): Promise<Response> {
    try {
      let authUser = await validate(AuthenticateValidator, request.body)
      
      if (authUser.errors) {
        return response.status(BAD_REQUEST).json(authUser.errors)
      }
      
      authUser = await userService.authenticate(authUser.item)
      
      return response.status(OK).json(authUser)
      
    } catch (error) {
      return response.status((error.status || INTERNAL_SERVER_ERROR)).json(error)
    }
  }
}
