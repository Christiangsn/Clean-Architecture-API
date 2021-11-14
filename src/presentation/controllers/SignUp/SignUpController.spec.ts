import { SignUpController } from './SignUp'
import { IMissingParamError, IServerError } from '../../errors'
import { AccountModel, AddAccountModel, AddAccount, IValidation } from './SignUpProtocols'
import { badRequest } from '@presentation/helpers/http/httpHelper'

interface SutTypes {
  sut: SignUpController
  makeAccountStub: AddAccount,
  validateStub: IValidation
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }
      return fakeAccount
    }
  }
  return new AddAccountStub()
}

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  // MOCKS
  // retorno marretado = STUB
  const makeAccountStub = makeAddAccount()
  const validateStub = makeValidation()
  const sut = new SignUpController(makeAccountStub, validateStub)
  return {
    sut,
    makeAccountStub,
    validateStub
  }
}

describe('SignUpController', () => {
  // Erro de execeção

  test('should return 500 if AddAccount throws', async () => {
    const { sut, makeAccountStub } = makeSut()

    jest.spyOn(makeAccountStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => {
        reject(new Error())
      })
    })

    const hhtRequest = {
      body: {
        name: 'any',
        email: 'any_email@mail.com',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpRequest = await sut.handle(hhtRequest)
    expect(httpRequest.statusCode).toBe(500)
    expect(httpRequest.body).toEqual(new IServerError(null))
  })

  // Caso o usuario for criado
  test('should return 200 if in valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_confirm_password',
        passwordConfirm: 'valid_confirm_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)

    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    })
  })

  test('should call Validation with correct value', async () => {
    const { sut, validateStub } = makeSut()
    const validateSpy = jest.spyOn(validateStub, 'validate')
    const hhtRequest = {
      body: {
        name: 'any',
        email: 'any_email@mail.com',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    await sut.handle(hhtRequest)
    expect(validateSpy).toHaveBeenCalledWith(hhtRequest.body)
  })

  test('should call AddAccount with correct values', async () => {
    const { sut, makeAccountStub } = makeSut()
    const addSpy = jest.spyOn(makeAccountStub, 'add')
    const hhtRequest = {
      body: {
        name: 'any',
        email: 'any_email@mail.com',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    await sut.handle(hhtRequest)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any',
      email: 'any_email@mail.com',
      password: 'password'
    })
  })

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validateStub } = makeSut()
    jest.spyOn(validateStub, 'validate').mockReturnValueOnce(new IMissingParamError('any_field'))
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_confirm_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new IMissingParamError('any_field')))
  })
})
