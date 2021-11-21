import { LoadAccountByToken } from '@domain/contracts/accountByToken'
import { AccountModel } from '@domain/contracts/addAccount'
import { IAccessDeniedError } from '@presentation/errors/accessDeniedError'
import { forbidden } from '@presentation/helpers/http/httpHelper'
import { AuthMiddleware } from './auth'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hash_password'
})

describe('Auth Middleware', () => {
  test('Should return 403 if no token exists in Authorization', async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async load (accessToken: string, role?: string): Promise<AccountModel> {
        return new Promise(resolve => resolve(makeFakeAccount()))
      }
    }

    const loadAccountByTokenStub = new LoadAccountByTokenStub()
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new IAccessDeniedError()))
  })

  test('Should calls LoadAccountByToken with correct accessToken', async () => {
    class LoadAccountByTokenStub implements LoadAccountByToken {
      async load (accessToken: string, role?: string): Promise<AccountModel> {
        return new Promise(resolve => resolve(makeFakeAccount()))
      }
    }

    const loadAccountByTokenStub = new LoadAccountByTokenStub()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    const sut = new AuthMiddleware(loadAccountByTokenStub)
    await sut.handle({
      headers: {
        Authorization: 'Bearer any_token'
      }
    })

    expect(loadSpy).toHaveBeenCalledWith('Bearer any_token')
  })
})
