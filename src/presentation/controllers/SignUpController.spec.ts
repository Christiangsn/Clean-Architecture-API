import { SignUpController } from './SignUp'

describe('SignUpController', () => {
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
    expect(httpRequest.body).toEqual(new Error('Mising params: name'))
  })

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
    expect(httpRequest.body).toEqual(new Error('Mising params: email'))
  })
})
