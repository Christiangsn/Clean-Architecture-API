import { AddSurveyRepository } from '@data/protocols/database/Survey/addSurveyRepository'
import { AddSurvey, AddSurveyModel } from '@domain/contracts/addSurvey'

export class DbAddSurvey implements AddSurvey {
  constructor (
        private addSurveyRepository: AddSurveyRepository
  ) {}

  async add (survey: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(survey)
  }
}
