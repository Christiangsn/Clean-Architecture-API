import { SignUpController } from './SignUp'
import { MissingParamError } from '../errors/MissingParamsError'

describe('SignUpController', () => {
  test('should return 400 if no email is provided', () => {
    const sut = new SignUpController()
    const hhtRequest = {
      body: {
        name: 'any',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpRequest = sut.handle(hhtRequest)
    expect(httpRequest.statusCode).toBe(400)
    expect(httpRequest.body).toEqual(new MissingParamError('email'))
  })

  test('should return 400 if no name is provided', () => {
    const sut = new SignUpController()
    const hhtRequest = {
      body: {
        email: 'any',
        password: 'password',
        passwordConfirm: 'password'
      }
    }
    const httpRequest = sut.handle(hhtRequest)
    expect(httpRequest.statusCode).toBe(400)
    expect(httpRequest.body).toEqual(new MissingParamError('name'))
  })

  test('should return 400 if no password is provided', () => {
    const sut = new SignUpController()
    const hhtRequest = {
      body: {
        name: 'any',
        email: 'any',
        passwordConfirm: 'password'
      }
    }
    const httpRequest = sut.handle(hhtRequest)
    expect(httpRequest.statusCode).toBe(400)
    expect(httpRequest.body).toEqual(new MissingParamError('password'))
  })
})
