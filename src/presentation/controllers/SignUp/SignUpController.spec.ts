import { SignUpController } from './SignUp'
import { IMissingParamError, IInvalidParamsError, IServerError } from '../../errors'
import { IEmailValidator, AccountModel, AddAccountModel, AddAccount, IValidation } from './SignUpProtocols'
import { badRequest } from '@presentation/helpers/httpHelper'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: IEmailValidator,
  makeAccountStub: AddAccount,
  validateStub: IValidation
}

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
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
  const emailValidatorStub = makeEmailValidator()
  const makeAccountStub = makeAddAccount()
  const validateStub = makeValidation()
  const sut = new SignUpController(emailValidatorStub, makeAccountStub, validateStub)
  return {
    sut,
    emailValidatorStub,
    makeAccountStub,
    validateStub
  }
}

describe('SignUpController', () => {
  test('should return 400 if in invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    // Mockar o valor default para falhar e retornar o teste
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const hhtRequest = {
      body: {
        name: 'any',
        email: 'invalid_email@mail.com',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpRequest = await sut.handle(hhtRequest)
    expect(httpRequest.statusCode).toBe(400)
    expect(httpRequest.body).toEqual(new IInvalidParamsError('email'))
  })

  test('should call EmailValidator with correcto email', async () => {
    const { sut, emailValidatorStub } = makeSut()

    const idValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const hhtRequest = {
      body: {
        name: 'any',
        email: 'invalid_email@mail.com',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    await sut.handle(hhtRequest)
    expect(idValidSpy).toHaveBeenCalledWith('invalid_email@mail.com')
  })

  // Erro de execeção
  test('should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
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

  test('should return 400 if Validation returns an error', async () => {
    const { sut, validateStub } = makeSut()
    jest.spyOn(validateStub, 'validate').mockReturnValueOnce(new IMissingParamError('any_field'))
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_confirm_password',
        passwordConfirm: 'valid_confirm_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(badRequest)
  })
})
