import { IInvalidParamsError, IMissingParamError } from '@presentation/errors'
import { badRequest, serverError } from '@presentation/helpers/httpHelper'
import { HttpRequest, HttpResponse, ProtocolControllers } from '../../protocol'
import { IEmailValidator } from '../SignUp/SignUpProtocols'

class LoginController implements ProtocolControllers {
  constructor (
        private emailValidator: IEmailValidator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        return new Promise(resolve => resolve(badRequest(new IMissingParamError('email'))))
      }

      if (!password) {
        return new Promise(resolve => resolve(badRequest(new IMissingParamError('password'))))
      }

      if (!this.emailValidator.isValid(email)) {
        return new Promise(resolve => resolve(badRequest(new IInvalidParamsError('email'))))
      }
    } catch (error) {
      return serverError(error)
    }
  }
}

export { LoginController }
