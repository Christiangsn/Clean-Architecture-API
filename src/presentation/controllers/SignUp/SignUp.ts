import { HttpRequest, HttpResponse, ProtocolControllers, IEmailValidator, AddAccount, IValidation } from './SignUpProtocols'
import { IInvalidParamsError } from '../../errors'
import { badRequest, serverError, ok } from '../../helpers/httpHelper'

export class SignUpController implements ProtocolControllers {
  constructor (
    private emailValidator: IEmailValidator,
    private addAccount: AddAccount,
    private validation: IValidation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, email, password, passwordConfirm } = httpRequest.body

    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) {
        return badRequest(error)
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
