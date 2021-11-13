import { IMissingParamError } from '@presentation/errors'
import { badRequest } from '@presentation/helpers/httpHelper'
import { HttpRequest, HttpResponse, ProtocolControllers } from '../../protocol'

class LoginController implements ProtocolControllers {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return new Promise(resolve => resolve(badRequest(new IMissingParamError('email'))))
    }

    if (!httpRequest.body.password) {
      return new Promise(resolve => resolve(badRequest(new IMissingParamError('password'))))
    }
  }
}

export { LoginController }
