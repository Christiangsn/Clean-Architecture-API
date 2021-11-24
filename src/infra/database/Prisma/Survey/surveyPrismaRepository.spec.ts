import { Prisma as db } from '../helpers/prismaHelpers'
import { SurveyPrismaRepository } from './surveyPrismaRepository'

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

  describe('Load()', () => {

  })
})
