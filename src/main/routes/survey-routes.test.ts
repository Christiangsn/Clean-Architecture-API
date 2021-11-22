/* eslint-disable no-unused-vars */
import request from 'supertest'
import app from '../app'
import { Prisma as db } from '../../infra/database/Prisma/helpers/prismaHelpers'

describe('Login Routes', () => {
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
  })
})
