import fetch from 'node-fetch'
import * as dotenv from 'dotenv'
dotenv.config()

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
}
export default new ApiUsers()
