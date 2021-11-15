import { AddAccountRepository } from '../../../../data/protocols/database/Account/addAccountRepository'
import { AccountModel } from '@domain/contracts/addAccount'
import { AddAccountModel } from '../../../../domain/contracts/addAccount'
import { AddAccountFactory } from '@domain/factories/addAccount'
import { Prisma } from '../helpers/prismaHelpers'
import { loadAccountByEmailRepository } from '@data/protocols/database/Account/loadAccountByEmailRepository'
import { UpdateAccessTokenRepository } from '@data/protocols/database/Account/updatedAccessTokenRepository'

export class AccountPrismaRepository implements AddAccountRepository, loadAccountByEmailRepository, UpdateAccessTokenRepository {
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

  async updateAccessToken (id: string, token: string): Promise<void> {
    await Prisma.client.user.update({
      where: {
        id: id
      },
      data: {
        accessToken: token
      }
    })
  }
}
