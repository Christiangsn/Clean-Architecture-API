import { HttpRequest, HttpResponse } from '../protocol/http'
import { MissingParamError } from '../errors/MissingParamsError'
import { badRequest } from '../helpers/httpHelper'
import { ProtocolControllers } from '../protocol/controller'

export class SignUpController implements ProtocolControllers {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
