import { AddSurveyRepository } from '@data/protocols/database/Survey/addSurveyRepository'
import { AddSurveyModel } from '@domain/contracts/addSurvey'
import { Prisma } from '../helpers/prismaHelpers'

export class SurveyPrismaRepository implements AddSurveyRepository {
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
}
