import { badRequest } from '@presentation/helpers/http/httpHelper'
import { HttpRequest, HttpResponse, ProtocolControllers } from '@presentation/protocol'
import { IValidation } from '@presentation/protocol/validation'

export class AddSurveyController implements ProtocolControllers {
  constructor (
    private validation: IValidation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    return new Promise(resolve => resolve(null))
  }
}
