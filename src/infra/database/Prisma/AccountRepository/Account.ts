import { AddAccountRepository } from '../../../../data/protocols/addAccountRepository'
import { AccountModel } from '@domain/contracts/addAccount'
import { AddAccountModel } from '../../../../domain/contracts/addAccount'
import { AddAccountFactory } from '@domain/factories/addAccount'
import { Prisma } from '../helpers/prismaHelpers'

export class AccountPrismaRepository implements AddAccountRepository {
  constructor (private accountFactory: AddAccountFactory) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const resultAccount = await Prisma.client.user.create({
      data: accountData
    })
    const account = this.accountFactory.addFactory(resultAccount)
    const accounts = await Prisma.client.user.findFirst()
    console.log(account)
    return accounts.map(result => result.ops[0])
  }
}
