/* eslint-disable space-before-function-paren */
import { hash, compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import UserSchema from '../schemas/user-schema'
import ResponseError from '../errors/response-error'
import auth from '../auth/auth'

class UserService {
  public findUserByEmail(email: string): any {
    return UserSchema.findOne({ email })
  }

  public async login(body: any): Promise<any> {
    const user: any = await this.findUserByEmail(body.email)
    if (!user) {
      throw new ResponseError('Usuário não encontrado.', 404)
    }

    const passwordMatched = await compare(body.password, user.password)

    if (!passwordMatched) {
      throw new ResponseError('Senha/E-mail incorretos', 400)
    }
    const token = sign({
      subject: user._id,
      expiresIn: auth.jwt.expiresIn
    }, auth.jwt.secret)
    return { token }
  }

  public async saveUser(body: any): Promise<any> {
    const emailExists = await this.findUserByEmail(body.email)

    if (emailExists) {
      throw new ResponseError('Usuário já possui cadastro', 400)
    }
    const hashedPassword = await hash(body.password, 8)
    body.password = hashedPassword
    const user: any = await UserSchema.create(body)
    user.password = ''
    return user
  }
}
export default new UserService()
