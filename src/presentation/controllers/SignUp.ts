import { HttpRequest, HttpResponse } from '../protocol/http'
import { MissingParamError } from '../errors/MissingParamsError'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }
  }
}
