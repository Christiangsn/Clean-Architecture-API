import { LoadSurveys } from '@domain/contracts/loadSurveys'
import { HttpRequest, HttpResponse, ProtocolControllers } from '@presentation/protocol'

export class LoadSurveysController implements ProtocolControllers {
  constructor (private loadSurveys: LoadSurveys) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadSurveys.load()
    return null
  }
}
