import { HttpRequest, HttpResponse, ProtocolControllers, AddAccount, IValidation } from './SignUpProtocols'
import { badRequest, serverError, ok, forbidden } from '../../../helpers/http/httpHelper'
import { Authentication } from '@domain/contracts/authentication'
import { IEmailInUseError } from '@presentation/errors/emailInUseError'

export class SignUpController implements ProtocolControllers {
  constructor (
    private addAccount: AddAccount,
    private validation: IValidation,
    private authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, email, password } = httpRequest.body

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

      if (!account) {
        return forbidden(new IEmailInUseError())
      }

      const accessToken = await this.authentication.auth({
        email, password
      })

      return ok({ accessToken })
    } catch (error) {
      // console.log(error)
      return serverError(error)
    }
  }
}
