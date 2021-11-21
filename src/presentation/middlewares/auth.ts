import { IAccessDeniedError } from '@presentation/errors'
import { forbidden } from '@presentation/helpers/http/httpHelper'
import { HttpRequest, HttpResponse } from '@presentation/protocol'
import { ProtocolsMiddleware } from '../protocol/middleware'

export class AuthMiddleware implements ProtocolsMiddleware {
  handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = forbidden(new IAccessDeniedError())
    return new Promise(resolve => resolve(error))
  }
}
