/* eslint-disable no-unused-vars */
import request from 'supertest'
import app from '../app'
import { Prisma as db } from '../../infra/database/Prisma/helpers/prismaHelpers'
import { sign } from 'jsonwebtoken'
import { SurveysModel } from '@domain/contracts/loadSurveys'

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

describe('Login Routes', () => {
  beforeAll(async () => {
    await db.connection()
  })

  afterAll(async () => {
    await db.disconnect()
  })

  beforeEach(async () => {
    await db.client.user.deleteMany({})
    await db.client.surveyAnswers.deleteMany({})
    await db.client.survey.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should returns 403 on add survey withou accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          email: 'Question',
          answer: [{
            answer: 'Answer 1',
            image: 'http://image-name.com'
          },
          {
            answer: 'Answer 1'
          }]
        })
      expect(403)
    })

    test('Should returns 403 on add survey with valid accessToken', async () => {
      const res = await db.client.user.create({
        data: {
          name: 'Christian',
          email: 'christian@gmail.com',
          password: '123',
          role: 'admin'
        }
      })
      const { id } = res
      const accessToken = sign({ id }, process.env.SECRET)
      await db.client.user.update({
        where: {
          id: id
        },
        data: {
          accessToken: accessToken
        }
      })
      await request(app)
        .post('/api/surveys')
        .set('Authorization', 'Bearer' + ' ' + `${accessToken}`)
        .send({
          email: 'Question',
          answer: [{
            answer: 'Answer 1',
            image: 'http://image-name.com'
          },
          {
            answer: 'Answer 1'
          }]
        })
      expect(204)
    })
  })

  describe('GET /surveys', () => {
    test('Should returns 403 on load survey withou accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })

    test('Should returns 200 on load surveys with valid accessToken', async () => {
      const surveysInsert = makeFakeSurveys()
      const res = await db.client.user.create({
        data: {
          name: 'Christian',
          email: 'christian@gmail.com',
          password: '123'
        }
      })
      const { id } = res
      const accessToken = sign({ id }, process.env.SECRET)

      await db.client.user.update({
        where: {
          id: id
        },
        data: {
          accessToken: accessToken
        }
      })

      for (const survey of surveysInsert) {
        db.client.survey.create({
          data: {
            question: survey.question,
            answers: {
              create: survey.answers
            }

          }
        })
      }

      console.log('acessToken', accessToken)
      await request(app)
        .get('/surveys')
        .set('Authorization', 'Bearer' + ' ' + `${accessToken}`)

      expect(200)
    })
  })
})
