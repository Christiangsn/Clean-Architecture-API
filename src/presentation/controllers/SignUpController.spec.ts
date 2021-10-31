import { SignUpController } from './SignUp'
import { IMissingParamError, IInvalidParamsError, IServerError } from '../errors/'
import { IEmailValidator } from '../protocol/'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: IEmailValidator
}

const makeSut = (): SutTypes => {
  // MOCKS
  // retorno marretado = STUB
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  const emailValidatorStub = new EmailValidatorStub()
  const sut = new SignUpController(emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('SignUpController', () => {
  test('should return 400 if no email is provided', () => {
    const { sut } = makeSut()
    const hhtRequest = {
      body: {
        name: 'any',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpRequest = sut.handle(hhtRequest)
    expect(httpRequest.statusCode).toBe(400)
    expect(httpRequest.body).toEqual(new IMissingParamError('email'))
  })

  test('should return 400 if no name is provided', () => {
    const { sut } = makeSut()
    const hhtRequest = {
      body: {
        email: 'any',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpRequest = sut.handle(hhtRequest)
    expect(httpRequest.statusCode).toBe(400)
    expect(httpRequest.body).toEqual(new IMissingParamError('name'))
  })

  test('should return 400 if no password is provided', () => {
    const { sut } = makeSut()
    const hhtRequest = {
      body: {
        name: 'any',
        email: 'any',
        passwordConfirm: 'password'
      }
    }
    const httpRequest = sut.handle(hhtRequest)
    expect(httpRequest.statusCode).toBe(400)
    expect(httpRequest.body).toEqual(new IMissingParamError('password'))
  })

  test('should return 400 if in invalid email is provided', () => {
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
    const httpRequest = sut.handle(hhtRequest)
    expect(httpRequest.statusCode).toBe(400)
    expect(httpRequest.body).toEqual(new IInvalidParamsError('email'))
  })

  test('should call EmailValidator with correcto email', () => {
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
    sut.handle(hhtRequest)
    expect(idValidSpy).toHaveBeenCalledWith('invalid_email@mail.com')
  })

  // Erro de execeção
  test('should return 500 if EmailValidator throws', () => {
    class EmailValidatorStub implements IEmailValidator {
      isValid (email: string): boolean {
        throw new Error()
      }
    }
    const emailValidatorStub = new EmailValidatorStub()
    const sut = new SignUpController(emailValidatorStub)

    const hhtRequest = {
      body: {
        name: 'any',
        email: 'any_email@mail.com',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpRequest = sut.handle(hhtRequest)
    expect(httpRequest.statusCode).toBe(500)
    expect(httpRequest.body).toEqual(new IServerError())
  })
})
