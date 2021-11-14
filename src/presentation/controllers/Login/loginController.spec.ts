import { LoginController } from './loginController'
import { anauthorized, badRequest, ok, serverError } from '../../helpers/http/httpHelper'
import { IMissingParamError } from '@presentation/errors'
import { IValidation } from '../SignUp/SignUpProtocols'
import { Authentication, AuthenticationModel } from '@domain/contracts/authentication'

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth ({ email, password }: AuthenticationModel): Promise<string> {
      return 'any_token'
    }
  }
  return new AuthenticationStub()
}

interface SutTypes {
    sut: LoginController
    authenticationStub: Authentication,
    validateStub: IValidation
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeAuthentication()
  const validateStub = makeValidation()
  const sut = new LoginController(authenticationStub, validateStub)

  return {
    sut,
    authenticationStub,
    validateStub
  }
}

describe('', () => {
  test('Sould call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email@mail.com',
      password: 'any_password'
    })
  })

  test('Sould return 401 if an  invalid crendetials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(anauthorized())
  })

  test('Should returns 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => {
      reject(new Error())
    }))
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Sould return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(ok({
      accessToken: 'any_token'
    }))
  })

  test('should call Validation with correct values', async () => {
    const { sut, validateStub } = makeSut()
    const validateSpy = jest.spyOn(validateStub, 'validate')
    const httpRequest = {
      body: {
        name: 'any',
        email: 'any_email@mail.com',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
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
