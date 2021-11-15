import { SignUpController } from '@presentation/controllers/SignUp/SignUp'
import { DbAddAccount } from '@data/useCases/addAccount/dbAddAccount'
import { BcryptAdapter } from '@infra/criptografy/bcrypt/bscryptAdapter'
import { AccountPrismaRepository } from '@infra/database/Prisma/Account/AccountPrismRepository'
import { LogPrismaRepository } from '@infra/database/Prisma/Log/logPrismaRepository'
import { AddAccountFactory } from '@domain/factories/addAccount'
import { ProtocolControllers } from '@presentation/protocol/controller'
import { LogControllerDecorator } from '../../decorators/logControllerDecorator'
import { makeSignUpValidation } from './signUpValidation'

export const makeSignUpController = (): ProtocolControllers => {
  const bcryptAdapter = new BcryptAdapter(12)
  const addAccountFactory = new AddAccountFactory()
  const accountPrismaRepository = new AccountPrismaRepository(addAccountFactory)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountPrismaRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  const logPrismaRepository = new LogPrismaRepository()
  const logControllerDecorator = new LogControllerDecorator(signUpController, logPrismaRepository)

  return logControllerDecorator
}
