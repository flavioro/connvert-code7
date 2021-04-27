import DebtSchema from '../schemas/DebtSchema'

class Debts {
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
export default new Debts()
