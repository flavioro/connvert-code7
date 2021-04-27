import fetch from 'node-fetch'
import DebtSchema from '../schemas/DebtSchema'

const apiUsers = process.env.API_USERS_JSON

class ApiUsers {
  public async getUsers () {
    const users = await fetch(apiUsers)
      .then(response => response.json())
      .catch(_error => [])
    return users
  }

  public async getUserById (id: string) {
    const user = await fetch(`${apiUsers}/${id}`)
      .then(response => response.json())
      .catch(_error => null)
    return user
  }

  public async getDebtsByUsersAll (clientId: string) {
    const debts = await DebtSchema.find({ client_id: clientId })
    return debts
  }

  public async getDebtsByUser (clientId: string, pagination:any) {
    const debts = await DebtSchema.paginate({ client_id: parseInt(clientId) },
      {
        page: parseInt(pagination.page),
        limit: parseInt(pagination.limit)
      })
    return debts
  }
}
export default new ApiUsers()
