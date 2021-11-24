import { LoadSurveysModel } from '@domain/contracts/loadSurveys'

export interface LoadSurveysRepository {
    loadAll (): Promise<LoadSurveysModel[]>
}
