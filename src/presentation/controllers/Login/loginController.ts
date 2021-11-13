import { IMissingParamError } from '@presentation/errors'
import { badRequest } from '@presentation/helpers/httpHelper'
import { HttpRequest, HttpResponse, ProtocolControllers } from '../../protocol'

class LoginController implements ProtocolControllers {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise(resolve => resolve(badRequest(new IMissingParamError('email'))))
  }
}

export { LoginController }
