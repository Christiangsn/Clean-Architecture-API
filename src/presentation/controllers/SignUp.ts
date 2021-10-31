import { HttpRequest, HttpResponse, ProtocolControllers, IEmailValidator } from '../protocol/'
import { IMissingParamError, IInvalidParamsError } from '../errors/'
import { badRequest, serverError } from '../helpers/httpHelper'

export class SignUpController implements ProtocolControllers {
  constructor (private emailValidator: IEmailValidator) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirm']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new IMissingParamError(field))
        }
      }

      if (httpRequest.body.password !== httpRequest.body.passwordConfirm) {
        return badRequest(new IInvalidParamsError('passwordConfirm'))
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new IInvalidParamsError('email'))
      }
    } catch (error) {
      return serverError()
    }
  }
}
