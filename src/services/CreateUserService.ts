import { hash } from 'bcryptjs'

import UserSchema from '../schemas/UserSchema'
import AppError from '../errors/AppError'
import { BAD_REQUEST } from '../tools/httpStatus'

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {

  public async createUser({name,
    email,
    password,
  }: IRequest): Promise<any> {

    const emailExists = await UserSchema.findOne({ email })

    if (emailExists) {
      throw new AppError('Email address already used.', BAD_REQUEST)
    }

    const hashedPassword = await hash(password, 8)
    password = hashedPassword
    const user = await UserSchema.create({
      name,
      email,
      password
    })
    delete user.password

    return user
  }
}

export default new CreateUserService;
