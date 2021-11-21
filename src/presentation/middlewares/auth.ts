/* eslint-disable dot-notation */
import { LoadAccountByToken } from '@domain/contracts/accountByToken'
import { IAccessDeniedError } from '@presentation/errors'
import { forbidden } from '@presentation/helpers/http/httpHelper'
import { HttpRequest, HttpResponse } from '@presentation/protocol'
import { ProtocolsMiddleware } from '../protocol/middleware'

export class AuthMiddleware implements ProtocolsMiddleware {
  constructor (
        private loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['Authorization']

    if (accessToken) {
      await this.loadAccountByToken.load(accessToken)
    }

    return forbidden(new IAccessDeniedError())
  }
}
