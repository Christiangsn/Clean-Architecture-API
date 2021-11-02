import db from '../helpers/prismaHelpers'
import { AccountPrismaRepository } from './Account'
import { AddAccountFactory } from '../../../../domain/factories/addAccount'

describe('Account SqLite Repository', () => {
  beforeAll(async () => {
    db.$connect()
  })

  afterAll(async () => {
    db.$disconnect()
  })

  beforeEach(async () => {
    await db.user.updateMany({
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

  test('Should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@email.com')
    expect(account.password).toBe('any_password')
  })
})
