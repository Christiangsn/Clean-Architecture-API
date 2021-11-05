import { SignUpController } from '@presentation/controllers/SignUp/SignUp'
import { DbAddAccount } from '@data/useCases/addAccount/dbAddAccount'
import { EmailValidatorAdapter } from '@util/emailValidatorAdapter'
import { BcryptAdapter } from '@infra/criptografy/bscryptAdapter'
import { AccountPrismaRepository } from '@infra/database/Prisma/AccountRepository/Account'
import { AddAccountFactory } from '@domain/factories/addAccount'
import { ProtocolControllers } from '@presentation/protocol/controller'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): ProtocolControllers => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(12)
  const addAccountFactory = new AddAccountFactory()
  const accountPrismaRepository = new AccountPrismaRepository(addAccountFactory)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountPrismaRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)
  const logControllerDecorator = new LogControllerDecorator(signUpController)

  return logControllerDecorator
}
