/* eslint-disable no-unused-vars */
import request from 'supertest'
import app from '../app'
import { Prisma } from '../../infra/database/Prisma/helpers/prismaHelpers'
import { AccountPrismaRepository } from '../../infra/database/Prisma/Account/AccountPrismRepository'
import { AddAccountFactory } from '../../domain/factories/addAccount'
import { hash } from 'bcrypt'

describe('Login Routes', () => {
  beforeAll(async () => {
    await Prisma.connection()
  })

  afterAll(async () => {
    await Prisma.disconnect()
  })

  beforeEach(async () => {
    await Prisma.client.surveyAnswers.deleteMany({})
    await Prisma.client.survey.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should returns 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Christian',
          email: 'christian@gmail.com',
          password: '123',
          passwordConfirm: '123'
        })
      expect(200)
    })
  })

  describe('POST /surveys', () => {
    test('Should returns 200 on add survey success', async () => {
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
      expect(204)
    })
  })
})
