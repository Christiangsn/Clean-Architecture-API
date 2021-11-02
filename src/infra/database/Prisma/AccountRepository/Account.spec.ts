import db from '../helpers/prismaHelpers'
import { AccountPrismaRepository } from './Account'

describe('Account SqLite Repository', () => {
  beforeAll(async () => {
    db.$connect()
  })

  afterAll(async () => {
    db.$disconnect()
  })

  const makeSut = (): AccountPrismaRepository => {
    return new AccountPrismaRepository()
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
