import { DbLoadSurveys } from '@data/useCases/loadSurveys/dbLoadSurveys'
import { LoadSurveys } from '@domain/contracts/loadSurveys'
import { SurveyPrismaRepository } from '@infra/database/Prisma/Survey/surveyPrismaRepository'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const accountPrismaRepository = new SurveyPrismaRepository()
  return new DbLoadSurveys(accountPrismaRepository)
}
