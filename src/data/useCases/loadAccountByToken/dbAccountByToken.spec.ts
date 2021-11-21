import { DecrypterToken } from '@data/protocols/criptografy/decrypter'
import { DbLoadAccountByToken } from './dbAccountByToken'

describe('DbLoadAccountByToken UseCase', () => {
  test('Should call Decrypter with correct values', async () => {
    class DecrypterStub implements DecrypterToken {
      async decrypt (token: string): Promise<string> {
        return new Promise(resolve => resolve('any_value'))
      }
    }

    const decrypterStub = new DecrypterStub()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    const sut = new DbLoadAccountByToken(decrypterStub)
    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})
