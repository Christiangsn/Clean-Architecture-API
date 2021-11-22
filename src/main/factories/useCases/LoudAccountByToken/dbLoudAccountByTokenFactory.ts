import { DbLoadAccountByToken } from '@data/useCases/loadAccountByToken/dbAccountByToken'
import { LoadAccountByToken } from '@domain/contracts/accountByToken'
import { AddAccountFactory } from '@domain/factories/addAccount'
import { JwtAdapter } from '@infra/criptografy/jwt/jwtAdapter'
import { AccountPrismaRepository } from '@infra/database/Prisma/Account/AccountPrismRepository'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(process.env.SECRET)
  const addAccountFactory = new AddAccountFactory()
  const accountPrismaRepository = new AccountPrismaRepository(addAccountFactory)
  return new DbLoadAccountByToken(jwtAdapter, accountPrismaRepository)
}
