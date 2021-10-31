import { HttpRequest, HttpResponse } from '../protocol/http'
import { MissingParamError } from '../errors/MissingParamsError'
import { badRequest } from '../helpers/httpHelper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('email'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('name'))
    }
  }
}
