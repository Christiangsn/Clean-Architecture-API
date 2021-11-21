import { LoadAccountByToken } from '@domain/contracts/accountByToken'
import { AccountModel } from '@domain/contracts/addAccount'
import { IAccessDeniedError } from '@presentation/errors/accessDeniedError'
import { forbidden } from '@presentation/helpers/http/httpHelper'
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

const makeSut = (): SutTypes => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  const loadAccountByTokenStub = new LoadAccountByTokenStub()
  const sut = new AuthMiddleware(loadAccountByTokenStub)

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
    const { sut, loadAccountByTokenStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('Bearer any_token')
  })

  test('Should return 403 if LoadAcountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new IAccessDeniedError()))
  })
})
