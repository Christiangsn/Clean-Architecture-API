import { DbAddAccount } from '@data/useCases/addAccount/dbAddAccount'
import { AddAccount } from '@domain/contracts/addAccount'
import { AddAccountFactory } from '@domain/factories/addAccount'
import { BcryptAdapter } from '@infra/criptografy/bcrypt/bscryptAdapter'

import { AccountPrismaRepository } from '@infra/database/Prisma/Account/AccountPrismRepository'

export const makeDbAddAccount = (): AddAccount => {
  const bcryptAdapter = new BcryptAdapter(12)
  const addAccountFactory = new AddAccountFactory()
  const accountPrismaRepository = new AccountPrismaRepository(addAccountFactory)
  return new DbAddAccount(bcryptAdapter, accountPrismaRepository)
}
