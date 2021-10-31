import { HttpRequest, HttpResponse, ProtocolControllers, IEmailValidator } from '../protocol/'
import { IMissingParamError, IInvalidParamsError } from '../errors/'
import { badRequest, serverError } from '../helpers/httpHelper'
import { AddAccount } from '../../domain/useCases/AddAccount'

export class SignUpController implements ProtocolControllers {
  constructor (
    private emailValidator: IEmailValidator,
    private addAccount: AddAccount
  ) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const { name, email, password, passwordConfirm } = httpRequest.body
      const requiredFields = ['name', 'email', 'password', 'passwordConfirm']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new IMissingParamError(field))
        }
      }

      if (password !== passwordConfirm) {
        return badRequest(new IInvalidParamsError('passwordConfirm'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new IInvalidParamsError('email'))
      }

      this.addAccount.add({
        name,
        email,
        password
      })
    } catch (error) {
      return serverError()
    }
  }
}
