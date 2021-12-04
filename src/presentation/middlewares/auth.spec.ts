import { LoadAccountByToken } from '@domain/contracts/accountByToken'
import { AccountModel } from '@domain/contracts/addAccount'
import { IAccessDeniedError } from '@presentation/errors/accessDeniedError'
import { IInvalidTokenError } from '@presentation/errors/invalidTokenError'
import { anauthorized, badRequest, forbidden, ok, serverError } from '@presentation/helpers/http/httpHelper'
import { HttpRequest } from '@presentation/protocol'
import { AuthMiddleware } from './auth'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hash_password'
})

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    Authorization: 'Bearer any_token'
  }
})

interface SutTypes {
  sut: AuthMiddleware,
  loadAccountByTokenStub: LoadAccountByToken
}

const makeSut = (role?: string): SutTypes => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }

  const loadAccountByTokenStub = new LoadAccountByTokenStub()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)

  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no token exists in Authorization', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new IAccessDeniedError()))
  })

  test('Should calls LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = makeSut(role)
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })

  test('Should return 401 if LoadAcountByToken returns invalid format token and for unauthorized', async () => {
    const { sut } = makeSut()

    const httpResponse: HttpRequest = await sut.handle({
      headers: {
        Authorization: 'Bearerany_token'
      }
    })
    console.log('httpRequest aqui', httpResponse)
    expect(httpResponse).toEqual(anauthorized())
  })

  test('Should return 403 if LoadAcountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new IAccessDeniedError()))
  })

  test('Should return 400 if Bearer invalid returns BadRequest', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({
      headers: {
        Authorization: 'Error any_token'
      }
    })
    expect(httpResponse).toEqual(badRequest(new IInvalidTokenError()))
  })

  test('Should return 200 if LoadAcountByToken returns an account', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ accountId: 'valid_id' }))
  })

  test('Should return 500 if LoadAcountByToken thors', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
