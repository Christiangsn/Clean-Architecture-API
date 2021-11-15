import { LogControllerDecorator } from './logControllerDecorator'
import { HttpRequest, HttpResponse, ProtocolControllers } from '@presentation/protocol/'
import { serverError } from '@presentation/helpers/http/httpHelper'
import { LogErrorRepository } from '@data/protocols/database/Log/logErrorRepository'

const makeLogErrorRepositoryStub = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stackError: string): Promise<void> {
      return new Promise(resolve => resolve())
    }
  }
  return new LogErrorRepositoryStub()
}

const makeController = (): ProtocolControllers => {
  class ControllerStub implements ProtocolControllers {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: 'Christian'
        }
      }
      return new Promise(resolve => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}

interface SutTypes {
  sut: LogControllerDecorator,
  controllerStub: ProtocolControllers
  logErrorRepositorySutb: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const logErrorRepositorySutb = makeLogErrorRepositoryStub()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositorySutb)
  return {
    sut,
    controllerStub,
    logErrorRepositorySutb
  }
}

describe('LogController Decorator', () => {
  test('Sould call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirm: 'any_password'
      }
    }
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirm: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'Christian'
      }
    })
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositorySutb } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(serverError(fakeError))))
    const logSpy = jest.spyOn(logErrorRepositorySutb, 'logError')
    const httpRequest = {
      body: {
        email: 'any_mail@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirm: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
