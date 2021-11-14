import request from 'supertest'
import app from '../app'
import { Prisma } from '../../infra/database/Prisma/helpers/prismaHelpers'
import { AccountPrismaRepository } from '../../infra/database/Prisma/AccountRepository/Account'
import { AddAccountFactory } from '../../domain/factories/addAccount'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await Prisma.connection()
  })

  afterAll(async () => {
    await Prisma.disconnect()
  })

  beforeEach(async () => {
    await Prisma.client.user.updateMany({
      data: {}
    })
  })

  const addFactory = (): AddAccountFactory => {
    return new AddAccountFactory()
  }

  const makeSut = (): AccountPrismaRepository => {
    const factory = addFactory()
    return new AccountPrismaRepository(factory)
  }

  test('Should returns an account on success', async () => {
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
