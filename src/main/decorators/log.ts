import { HttpRequest, HttpResponse } from '@presentation/protocol/index'
import { ProtocolControllers } from '@presentation/protocol/controller'

class LogControllerDecorator implements ProtocolControllers {
  constructor (
        private controller: ProtocolControllers
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)

    return httpResponse
  }
}

export { LogControllerDecorator }
