import { IAccessDeniedError } from '@presentation/errors/accessDeniedError'
import { forbidden } from '@presentation/helpers/http/httpHelper'
import { AuthMiddleware } from './auth'

describe('Auth Middleware', () => {
  test('Should return 403 if no token exists in Authorization', async () => {
    const sut = new AuthMiddleware()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new IAccessDeniedError()))
  })
})
