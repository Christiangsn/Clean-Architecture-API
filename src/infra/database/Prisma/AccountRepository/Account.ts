import { AddAccountRepository } from '../../../../data/protocols/addAccountRepository'
import { AccountModel } from '@domain/contracts/addAccount'
import { AddAccountModel } from '../../../../domain/contracts/addAccount'
import { AddAccountFactory } from '@domain/factories/addAccount'
import db from '../helpers/prismaHelpers'

export class AccountPrismaRepository implements AddAccountRepository {
  constructor (private accountFactory: AddAccountFactory) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const resultAccount = await db.user.create({
      data: accountData
    })
    const account = this.accountFactory.addFactory(resultAccount)
    return account
  }
}
