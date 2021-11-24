import { LoadSurveysRepository } from '@data/protocols/database/Survey/loadSurveysRepository'
import { LoadSurveys, SurveysModel } from '@domain/contracts/loadSurveys'

export class DbLoadSurveys implements LoadSurveys {
  constructor (
        private loadSurveysRepository: LoadSurveysRepository
  ) {}

  async load (): Promise<SurveysModel[]> {
    await this.loadSurveysRepository.loadAll()
    return []
  }
}
