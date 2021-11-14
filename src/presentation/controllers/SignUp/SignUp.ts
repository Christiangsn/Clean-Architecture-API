import { HttpRequest, HttpResponse, ProtocolControllers, AddAccount, IValidation } from './SignUpProtocols'
import { badRequest, serverError, ok } from '../../helpers/httpHelper'

export class SignUpController implements ProtocolControllers {
  constructor (
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

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
