import { HttpRequest, HttpResponse, ProtocolControllers, AddAccount, IValidation } from './SignUpProtocols'
import { badRequest, serverError, ok } from '../../helpers/http/httpHelper'
import { Authentication } from '@domain/contracts/authentication'

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

      const accessToken = await this.authentication.auth({
        email, password
      })
      console.log('aqui', accessToken)

      return ok({ accessToken })
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
