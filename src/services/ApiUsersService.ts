import fetch from 'node-fetch'
import DebtSchema from '../schemas/DebtSchema'

const apiUsers = process.env.API_USERS_JSON

class ApiUsers {
  public async getUsers (): Promise<any> {
    const users = await fetch(apiUsers)
      .then(response => response.json())
      .catch(_error => [])
    return users
  }

  public async getUserById (id: any): Promise<any> {
    const user = await fetch(`${api}/${id}`)
      .then(response => response.json())
      .catch(_error => null)
    return user
  }

  public async getDebtsByUsersAll (clientId: any): Promise<any> {
    const debts = await DebtSchema.find({ client_id: clientId })
    return debts
  }

  public async getDebtsByUser (clientId: string, pagination:any): Promise<any> {
    const debts = await DebtSchema.paginate({ client_id: parseInt(clientId) },
      {
        page: parseInt(pagination.page),
        limit: parseInt(pagination.limit)
      })
    return debts
  }
}
export default new ApiUsers()
