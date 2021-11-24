import { LoadSurveysRepository } from '@data/protocols/database/Survey/loadSurveysRepository'
import { LoadSurveys, LoadSurveysModel } from '@domain/contracts/loadSurveys'

export class DbLoadSurveys implements LoadSurveys {
  constructor (
        private loadSurveysRepository: LoadSurveysRepository
  ) {}

  async load (): Promise<LoadSurveysModel[]> {
    const surveys = await this.loadSurveysRepository.loadAll()
    return surveys
  }
}
