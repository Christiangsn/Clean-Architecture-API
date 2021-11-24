import { LoadSurveys } from '@domain/contracts/loadSurveys'
import { ok, serverError } from '@presentation/helpers/http/httpHelper'
import { HttpRequest, HttpResponse, ProtocolControllers } from '@presentation/protocol'

export class LoadSurveysController implements ProtocolControllers {
  constructor (private loadSurveys: LoadSurveys) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return ok(surveys)
    } catch (error) {
      return serverError(error)
    }
  }
}
