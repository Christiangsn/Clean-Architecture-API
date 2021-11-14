import { Authentication } from '@domain/contracts/authentication'
import { anauthorized, badRequest, ok, serverError } from '@presentation/helpers/http/httpHelper'
import { HttpRequest, HttpResponse, ProtocolControllers } from '../../protocol'
import { IValidation } from '../SignUp/SignUpProtocols'

class LoginController implements ProtocolControllers {
  constructor (
        private authentication: Authentication,
        private validation: IValidation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
      }

      const accessToken = await this.authentication.auth({ email, password })

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
