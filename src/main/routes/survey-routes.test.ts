/* eslint-disable no-unused-vars */
import request from 'supertest'
import app from '../app'
import { Prisma as db } from '../../infra/database/Prisma/helpers/prismaHelpers'
import { sign } from 'jsonwebtoken'

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
        .set('Authorization', `Bearer ${accessToken}`)
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
})
