import { AddSurveyModel } from '@domain/contracts/addSurvey'

export interface AddSurveyRepository {
    add (surveyData: AddSurveyModel): Promise<void>
}
