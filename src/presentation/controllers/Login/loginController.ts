import { Authentication } from '@domain/contracts/authentication'
import { IInvalidParamsError, IMissingParamError } from '@presentation/errors'
import { anauthorized, badRequest, ok, serverError } from '@presentation/helpers/httpHelper'
import { HttpRequest, HttpResponse, ProtocolControllers } from '../../protocol'
import { IEmailValidator } from '../SignUp/SignUpProtocols'

class LoginController implements ProtocolControllers {
  constructor (
        private emailValidator: IEmailValidator,
        private authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      const requiredFields = ['email', 'password']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new IMissingParamError(field))
        }
      }

      if (!this.emailValidator.isValid(email)) {
        return badRequest(new IInvalidParamsError('email'))
      }

      const accessToken = await this.authentication.auth(email, password)

      if (!accessToken) {
        return anauthorized()
      }

      return ok({
        accessToken: 'any_token'
      })
    } catch (error) {
      return serverError(error)
    }
  }
}

export { LoginController }
