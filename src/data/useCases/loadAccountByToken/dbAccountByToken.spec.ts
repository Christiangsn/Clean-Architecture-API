import { DecrypterToken } from '@data/protocols/criptografy/decrypter'
import { DbLoadAccountByToken } from './dbAccountByToken'

interface SutTypes {
    sut: DbLoadAccountByToken,
    decrypterStub: DecrypterToken
}

const makeSut = (): SutTypes => {
  class DecrypterStub implements DecrypterToken {
    async decrypt (token: string): Promise<string> {
      return new Promise(resolve => resolve('any_value'))
    }
  }

  const decrypterStub = new DecrypterStub()
  const sut = new DbLoadAccountByToken(decrypterStub)

  return {
    sut,
    decrypterStub
  }
}
describe('DbLoadAccountByToken UseCase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')

    await sut.load('any_token')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })
})