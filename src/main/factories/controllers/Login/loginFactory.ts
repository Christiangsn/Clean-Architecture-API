import { ProtocolControllers } from '@presentation/protocol'
import { LoginController } from '@presentation/controllers/Login/loginController'
import { makeLoginValidation } from './loginValidation'
import { makeDbAuthentication } from '../../useCases/Authentication/dbAuthenticationFactory'
import { makeLogControllerDacorator } from '@main/factories/decorators/logControllerDecoractorFactory'

export const makeLoginController = (): ProtocolControllers => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation())
  return makeLogControllerDacorator(controller)
}
