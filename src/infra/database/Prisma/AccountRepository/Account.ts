import { AddAccountRepository } from '../../../../data/protocols/database/addAccountRepository'
import { AccountModel } from '@domain/contracts/addAccount'
import { AddAccountModel } from '../../../../domain/contracts/addAccount'
import { AddAccountFactory } from '@domain/factories/addAccount'
import { Prisma } from '../helpers/prismaHelpers'
import { loadAccountByEmailRepository } from '@data/protocols/database/loadAccountByEmailRepository'

export class AccountPrismaRepository implements AddAccountRepository, loadAccountByEmailRepository {
  constructor (private accountFactory: AddAccountFactory) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const resultAccount = await Prisma.client.user.create({
      data: accountData
    })
    const account = this.accountFactory.addFactory(resultAccount)
    return account
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const findAccount = await Prisma.client.user.findFirst({
      where: { email: email }
    })
    return findAccount && this.accountFactory.addFactory(findAccount)
  }
}
