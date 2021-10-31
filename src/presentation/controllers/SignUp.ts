import { HttpRequest, HttpResponse } from '../protocol/http'
import { IMissingParamError } from '../errors/MissingParamsError'
import { badRequest } from '../helpers/httpHelper'
import { ProtocolControllers } from '../protocol/controller'
import { IInvalidParamsError } from '../errors/InvalidParamsError'
import { IEmailValidator } from '../protocol/emailValidator'

export class SignUpController implements ProtocolControllers {
  constructor (private emailValidator: IEmailValidator) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirm']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new IMissingParamError(field))
      }
    }

    const isValid = this.emailValidator.isValid(httpRequest.body.email)
    if (!isValid) {
      return badRequest(new IInvalidParamsError('email'))
    }
  }
}
