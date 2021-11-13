import { LoginController } from './loginController'
import { badRequest } from '../../helpers/httpHelper'
import { IMissingParamError } from '@presentation/errors'

describe('', () => {
  test('should return 400 if no email is provided', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(badRequest(new IMissingParamError('email')))
  })

  test('should return 400 if no password is provided', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com'
      }
    }
    const httResponse = await sut.handle(httpRequest)
    expect(httResponse).toEqual(badRequest(new IMissingParamError('password')))
  })
})
