import { SurveysModel } from '@domain/contracts/loadSurveys'
import { Prisma as db } from '../helpers/prismaHelpers'
import { SurveyPrismaRepository } from './surveyPrismaRepository'

const makeFakeSurveys = (): SurveysModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    createdAt: new Date(),
    answers: [{
      id: 'any_id',
      image: 'any_image',
      answer: 'any_answer',
      createdAt: new Date()
    }]
  }, {
    id: 'other_id',
    question: 'other_question',
    createdAt: new Date(),
    answers: [{
      id: 'other_id',
      image: 'other_image',
      answer: 'other_answer',
      createdAt: new Date()
    }]
  }]
}

describe('Account SqLite Repository', () => {
  beforeAll(async () => {
    await db.connection()
  })

  afterAll(async () => {
    await db.disconnect()
  })

  beforeEach(async () => {
    await db.client.surveyAnswers.deleteMany({})
    await db.client.survey.deleteMany({})
  })

  const makeSut = (): SurveyPrismaRepository => {
    return new SurveyPrismaRepository()
  }

  describe('Add()', () => {
    test('Should add an survey on success', async () => {
      const sut = makeSut()
      await sut.add({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_anwer'
        }, {
          answer: 'other_anwer'
        }]
      })

      const survey = await db.client.survey.findFirst({
        where: {
          question: 'any_question'
        }
      })
      expect(survey).toBeTruthy()
    })
  })

  describe('LoadAll()', () => {
    test('Should load all surveys on success', async () => {
      const surveysInsert = makeFakeSurveys()

      for (const survey of surveysInsert) {
        await db.client.survey.create({
          data: {
            question: survey.question,
            answers: {
              create: survey.answers
            }

          }
        })
      }

      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('other_question')
    })
  })
})
