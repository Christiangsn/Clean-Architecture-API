import { AuthMiddleware } from '@presentation/middlewares/auth'
import { ProtocolsMiddleware } from '@presentation/protocol/middleware'
import { makeDbLoadAccountByToken } from '../useCases/LoudAccountByToken/dbLoudAccountByTokenFactory'

export const makeAuthMiddleware = (role?: string): ProtocolsMiddleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
