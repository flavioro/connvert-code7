import { Request, Response } from 'express'

import validate from '../validators/validate'
import userValidator from '../validators/userValidator'
import { BAD_REQUEST, CREATED } from '../tools/httpStatus'
import createUser from '../services/CreateUserService'

export default class CreateUserController {
  public static async CreateUser (request: Request, response: Response): Promise<Response> {
    let userValidate = await validate(userValidator, request.body)

    if (userValidate.errors) {
      return response.status(BAD_REQUEST).json(userValidate.errors)
    }

    try {
      userValidate = await createUser.createUser(userValidate.item)

      return response.status(CREATED).json(userValidate)
      
    } catch (error) {
      response.status(error.status).json(error)
    }
  }
}
