import { ProtocolControllers } from '@presentation/protocol'
import { LoginController } from '@presentation/controllers/Login/loginController'
import { LogControllerDecorator } from '../../decorators/logControllerDecorator'
import { DbAuthentication } from '@data/useCases/authentication/dbAuthentication'
import { LogPrismaRepository } from '@infra/database/Prisma/Log/logPrismaRepository'
import { AccountPrismaRepository } from '@infra/database/Prisma/Account/AccountPrismRepository'
import { BcryptAdapter } from '@infra/criptografy/bcrypt/bscryptAdapter'
import { JwtAdapter } from '@infra/criptografy/jwt/jwtAdapter'

import { makeLoginValidation } from './loginValidation'
import { AddAccountFactory } from '@domain/factories/addAccount'

export const makeLoginController = (): ProtocolControllers => {
  const bcryptAdapter = new BcryptAdapter(Number(process.env.SALT))
  const jwtAdapter = new JwtAdapter(process.env.SECRET)
  const addAccountFactory = new AddAccountFactory()
  const accountPrismaRepository = new AccountPrismaRepository(addAccountFactory)
  const dbAuthentication = new DbAuthentication(accountPrismaRepository, bcryptAdapter, jwtAdapter, accountPrismaRepository)
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logPrismaRepository = new LogPrismaRepository()
  return new LogControllerDecorator(loginController, logPrismaRepository)
}
