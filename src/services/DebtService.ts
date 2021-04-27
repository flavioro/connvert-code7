import ApiError from '../errors/AppError'
import { BAD_REQUEST, NOT_FOUND } from '../tools/httpStatus'
import DebtSchema from '../schemas/DebtSchema'
import Validate from '../validators/validate'
import DebtValidator from '../validators/DebtValidator'
import ClientService from './ApiUsersService'

class DebtService {
  public async CreateDebt (body: any) {
    const debt = await DebtSchema.create(body)
    return debt
  }

  public async UpdateDebt (id: string, body: any) {
    const debt = await DebtSchema.findByIdAndUpdate(id, body, {
      new: true
    }).catch(_error => {
      throw new ApiError('Debt not found.', NOT_FOUND)
    })
    return debt
  }

  public async DeleteDebt (id: string) {
    const debt = await DebtSchema.findByIdAndDelete(id).catch(_error => {
      throw new ApiError('Debt not found.', NOT_FOUND)
    })
    return debt
  }

  public async ValidateDebt (body: any) {
    const debt = await Validate(DebtValidator, body)
    if (debt.errors) {
      throw new ApiError(debt.errors, BAD_REQUEST)
    }
    const client = await ClientService.getUserById(body.client_id)
    if (!client.id) {
      throw new ApiError('User not found.', NOT_FOUND)
    }
    return debt.item
  }
}
export default new DebtService()
