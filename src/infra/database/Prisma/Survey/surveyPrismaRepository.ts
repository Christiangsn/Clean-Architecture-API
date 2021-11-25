import { AddSurveyRepository } from '@data/protocols/database/Survey/addSurveyRepository'
import { LoadSurveysRepository } from '@data/protocols/database/Survey/loadSurveysRepository'
import { AddSurveyModel } from '@domain/contracts/addSurvey'
import { LoadSurveysModel } from '@domain/contracts/loadSurveys'
import { Prisma } from '../helpers/prismaHelpers'

export class SurveyPrismaRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    await Prisma.client.survey.create({
      data: {
        question: surveyData.question,
        answers: {
          create: surveyData.answers
        }
      }
    })
  }

  async loadAll (): Promise<LoadSurveysModel[]> {
    const surveys = await Prisma.client.survey.findMany({
      include: { answers: true }
    })
    return surveys
  }
}
