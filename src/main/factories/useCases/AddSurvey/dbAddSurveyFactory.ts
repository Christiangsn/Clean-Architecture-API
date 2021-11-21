import { DbAddSurvey } from '@data/useCases/addSurvey/dbAddSurvey'
import { AddSurvey } from '@domain/contracts/addSurvey'
import { SurveyPrismaRepository } from '@infra/database/Prisma/Survey/surveyPrismaRepository'

export const makeDbAddSurvey = (): AddSurvey => {
  const accountPrismaRepository = new SurveyPrismaRepository()
  return new DbAddSurvey(accountPrismaRepository)
}
