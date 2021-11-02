import { AddAccountRepository } from '../../../../data/protocols/addAccountRepository'
import { AccountModel } from '../../../../domain/entities/Account'
import { AddAccountModel } from '../../../../domain/useCases/AddAccount'
import db from '../helpers/prismaHelpers'

export class AccountPrismaRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const resultAccount = await db.user.create({
      data: accountData
    })
    return resultAccount
  }
}
