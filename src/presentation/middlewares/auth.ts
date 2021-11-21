/* eslint-disable dot-notation */
import { LoadAccountByToken } from '@domain/contracts/accountByToken'
import { IAccessDeniedError } from '@presentation/errors'
import { IInvalidTokenError } from '@presentation/errors/invalidTokenError'
import { anauthorized, badRequest, forbidden, ok } from '@presentation/helpers/http/httpHelper'
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

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme)) {
      return badRequest(new IInvalidTokenError())
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
