import { DbAuthentication } from '@data/useCases/authentication/dbAuthentication'
import { Authentication } from '@domain/contracts/authentication'
import { AddAccountFactory } from '@domain/factories/addAccount'
import { BcryptAdapter } from '@infra/criptografy/bcrypt/bscryptAdapter'
import { JwtAdapter } from '@infra/criptografy/jwt/jwtAdapter'
import { AccountPrismaRepository } from '@infra/database/Prisma/Account/AccountPrismRepository'

export const makeDbAuthentication = (): Authentication => {
  const bcryptAdapter = new BcryptAdapter(Number(process.env.SALT))
  const jwtAdapter = new JwtAdapter(process.env.SECRET)
  const addAccountFactory = new AddAccountFactory()
  const accountPrismaRepository = new AccountPrismaRepository(addAccountFactory)
  return new DbAuthentication(accountPrismaRepository, bcryptAdapter, jwtAdapter, accountPrismaRepository)
}
