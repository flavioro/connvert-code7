/* eslint-disable space-before-function-paren */
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import { BAD_REQUEST, NOT_FOUND } from '../tools/httpStatus'

import UserSchema from '../schemas/UserSchema'
import AppError from '../errors/AppError'
import auth from '../auth/Authenticate'

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: typeof UserSchema;
  token: string;
}

class UserService {
  public findUserByEmail(email: string): any {
    return UserSchema.findOne({ email })
  }

  public async authenticate({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.findUserByEmail(email)
    if (!user) {
      throw new AppError('User not found', NOT_FOUND)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect email password combination.', BAD_REQUEST)
    }
    const token = sign({
      subject: user._id,
      expiresIn: auth.jwt.expiresIn
    }, auth.jwt.secret)
    
    return { user, token }
  }

}
export default new UserService()
