import { HttpRequest, HttpResponse } from '@presentation/protocol/index'
import { ProtocolControllers } from '@presentation/protocol/controller'
import { LogErrorRepository } from '@data/protocols/database/logErrorRepository'

class LogControllerDecorator implements ProtocolControllers {
  constructor (
    private controller: ProtocolControllers,
    private logErrorRepository: LogErrorRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }

    return httpResponse
  }
}

export { LogControllerDecorator }
