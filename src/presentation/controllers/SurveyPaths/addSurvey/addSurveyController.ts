import { HttpRequest, HttpResponse, ProtocolControllers } from '@presentation/protocol'
import { IValidation } from '@presentation/protocol/validation'

export class AddSurveyController implements ProtocolControllers {
  constructor (
    private validation: IValidation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return new Promise(resolve => resolve(null))
  }
}
