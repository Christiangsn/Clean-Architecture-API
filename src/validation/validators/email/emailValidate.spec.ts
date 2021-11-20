import { EmailValidate } from './emailRequestValidate'
import { IEmailValidator } from '../../protocols/emailValidator'

interface SutTypes {
  sut: EmailValidate
  emailValidatorStub: IEmailValidator,
}

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  // MOCKS
  // retorno marretado = STUB
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidate('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Email Validate', () => {
  test('should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut()

    const idValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'invalid_email@mail.com' })
    expect(idValidSpy).toHaveBeenCalledWith('invalid_email@mail.com')
  })

  // Erro de execeção
  test('should throw if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()

    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
