import { AddAccountRepository } from '../../../../data/protocols/addAccountRepository'
import { AccountModel } from '../../../../domain/entities/Account'
import { AddAccountModel } from '../../../../domain/useCases/AddAccount'
import { PrismaHelper } from '../helpers/prismaHelpers'

export class AccountPrismaRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    return new Promise<AccountModel>((resolve, reject) => { resolve(null) })
  }
}
