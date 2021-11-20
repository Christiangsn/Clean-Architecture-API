import { SignUpController } from '@presentation/controllers/LoginPaths/SignUp/SignUp'
import { ProtocolControllers } from '@presentation/protocol/controller'
import { makeSignUpValidation } from './signUpValidation'
import { makeDbAuthentication } from '../../useCases/Authentication/dbAuthenticationFactory'
import { makeDbAddAccount } from '@main/factories/useCases/Login/dbAddAccountFactory'
import { makeLogControllerDacorator } from '@main/factories/decorators/logControllerDecoractorFactory'

export const makeSignUpController = (): ProtocolControllers => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  return makeLogControllerDacorator(controller)
}
