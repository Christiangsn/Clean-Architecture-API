import { loadAccountByEmailRepository } from '@data/protocols/loadAccountByEmailRepository'
import { AccountModel } from '../addAccount/dbAddAccountProtocols'
import { DbAuthentication } from './dbAuthentication'

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailRepositoryStub implements loadAccountByEmailRepository {
      async load (email: string): Promise<AccountModel> {
        const account: AccountModel = {
          id: 'any_id',
          name: 'any_name',
          email: 'any_mail@mail.com',
          password: 'any_password'
        }
        return account
      }
    }
    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    await sut.auth({ email: 'any_mail@mail.com', password: 'any_password' })
    expect(loadSpy).toHaveBeenCalledWith('any_mail@mail.com')
  })
})
