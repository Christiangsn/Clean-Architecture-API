import { HashCompare } from '@data/protocols/criptografy/hash'
import { TokenGenerator } from '@data/protocols/criptografy/token'
import { loadAccountByEmailRepository } from '@data/protocols/database/loadAccountByEmailRepository'
import { UpdateAccessTokenRepository } from '@data/protocols/database/updatedAccessTokenRepository'
import { AccountModel } from '../addAccount/dbAddAccountProtocols'
import { DbAuthentication } from './dbAuthentication'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_mail@mail.com',
  password: 'hash_password'
})

const makeLoadAccountByEmailRepository = (): loadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements loadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return makeFakeAccount()
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeHashCompare = (): HashCompare => {
  class HashCompareStub implements HashCompare {
    async compare (value: string, hash: string): Promise<boolean> {
      return new Promise(resolve => resolve(true))
    }
  }
  return new HashCompareStub()
}

const makeTokenGenerator = (): TokenGenerator => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate (id: string): Promise<string> {
      return new Promise((resolve, reject) => resolve('any_token'))
    }
  }
  return new TokenGeneratorStub()
}

const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositorStub implements UpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {
      return new Promise((resolve, reject) => resolve())
    }
  }
  return new UpdateAccessTokenRepositorStub()
}

interface SutTypes {
  sut: DbAuthentication,
  loadAccountByEmailRepositoryStub: loadAccountByEmailRepository,
  hashCompareStub: HashCompare,
  tokenGeneratorStub: TokenGenerator,
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
  const tokenGeneratorStub = makeTokenGenerator()
  const hashCompareStub = makeHashCompare()
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashCompareStub, tokenGeneratorStub, updateAccessTokenRepositoryStub)
  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashCompareStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    await sut.auth({ email: 'any_mail@mail.com', password: 'any_password' })
    expect(loadSpy).toHaveBeenCalledWith('any_mail@mail.com')
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth({ email: 'any_mail@mail.com', password: 'any_password' })
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null)
    const acessToken = await sut.auth({ email: 'any_mail@mail.com', password: 'any_password' })
    expect(acessToken).toBeNull()
  })

  test('Should call HashComparer with correct values of password', async () => {
    const { sut, hashCompareStub } = makeSut()
    const compareSpy = jest.spyOn(hashCompareStub, 'compare')
    await sut.auth({ email: 'any_mail@mail.com', password: 'any_password' })
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hash_password')
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth({ email: 'any_mail@mail.com', password: 'any_password' })
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashCompareStub } = makeSut()
    jest.spyOn(hashCompareStub, 'compare').mockReturnValueOnce(new Promise(resolve => resolve(false)))
    const acessToken = await sut.auth({ email: 'any_mail@mail.com', password: 'any_password' })
    expect(acessToken).toBeNull()
  })

  test('Should call tokenGenerator with correct id', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate')
    await sut.auth({ email: 'any_mail@mail.com', password: 'any_password' })
    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if tokenGenerator throws', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    jest.spyOn(tokenGeneratorStub, 'generate').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth({ email: 'any_mail@mail.com', password: 'any_password' })
    await expect(promise).rejects.toThrow()
  })

  test('Should call tokenGenerator with correct id', async () => {
    const { sut } = makeSut()
    const acessToken = await sut.auth({ email: 'any_mail@mail.com', password: 'any_password' })
    expect(acessToken).toBe('any_token')
  })

  test('Should call UpdateAcessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updatedTokenSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth({ email: 'any_mail@mail.com', password: 'any_password' })
    expect(updatedTokenSpy).toHaveBeenCalledWith('any_id', 'any_token')
  })

  test('Should throw if UpdateAcessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const promise = sut.auth({ email: 'any_mail@mail.com', password: 'any_password' })
    await expect(promise).rejects.toThrow()
  })
})
