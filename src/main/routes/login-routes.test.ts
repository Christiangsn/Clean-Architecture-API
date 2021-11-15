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
    await Prisma.client.user.deleteMany({})
  })

  const addFactory = (): AddAccountFactory => {
    return new AddAccountFactory()
  }

  const makeSut = (): AccountPrismaRepository => {
    const factory = addFactory()
    return new AccountPrismaRepository(factory)
  }

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

  describe('POST /login', () => {
    test('Should returns 200 on login', async () => {
      const password = await hash('123', 12)
      await Prisma.client.user.create({
        data: {
          name: 'Christian',
          email: 'christian@gmail.com',
          password: password
        }
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'christian@gmail.com',
          password: '123'
        })
      expect(200)
    })
  })
})
