import { HttpRequest, HttpResponse, ProtocolControllers, IEmailValidator, AddAccount } from './SignUpProtocols'
import { IMissingParamError, IInvalidParamsError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/httpHelper'

export class SignUpController implements ProtocolControllers {
  constructor (
    private emailValidator: IEmailValidator,
    private addAccount: AddAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
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

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
