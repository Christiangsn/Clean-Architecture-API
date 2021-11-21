/* eslint-disable dot-notation */
import { LoadAccountByToken } from '@domain/contracts/accountByToken'
import { IAccessDeniedError } from '@presentation/errors'
import { anauthorized, forbidden, ok } from '@presentation/helpers/http/httpHelper'
import { HttpRequest, HttpResponse } from '@presentation/protocol'
import { ProtocolsMiddleware } from '../protocol/middleware'

export class AuthMiddleware implements ProtocolsMiddleware {
  constructor (
        private loadAccountByToken: LoadAccountByToken
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const accessToken = httpRequest.headers?.['Authorization']

    if (!accessToken) {
      return forbidden(new IAccessDeniedError())
    }

    const parts = accessToken.split(' ')

    if (parts.length !== 2) {
      return anauthorized()
    }

    if (accessToken) {
      const account = await this.loadAccountByToken.load(accessToken)

      if (account) {
        return ok({ accountId: account.id })
      }
    }

    return forbidden(new IAccessDeniedError())
  }
}
