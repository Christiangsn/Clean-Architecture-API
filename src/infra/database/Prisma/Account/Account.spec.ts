import { Prisma as db } from '../helpers/prismaHelpers'
import { AccountPrismaRepository } from './AccountPrismRepository'
import { AddAccountFactory } from '../../../../domain/factories/addAccount'

describe('Account SqLite Repository', () => {
  beforeAll(async () => {
    await db.connection()
  })

  afterAll(async () => {
    await db.disconnect()
  })

  beforeEach(async () => {
    await db.client.user.deleteMany({})
  })

  const addFactory = (): AddAccountFactory => {
    return new AddAccountFactory()
  }

  const makeSut = (): AccountPrismaRepository => {
    const factory = addFactory()
    return new AccountPrismaRepository(factory)
  }

  test('Should return an account on add success', async () => {
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

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    await db.client.user.create({
      data: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
      }
    })
    const account = await sut.loadByEmail('any_email@email.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@email.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_email@email.com')
    expect(account).toBeFalsy()
  })

  test('Should update the account accessToken on updateAccessToken success', async () => {
    const sut = makeSut()
    const { id, accessToken } = await db.client.user.create({
      data: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password'
      }
    })
    expect(accessToken).toBeFalsy()
    await sut.updateAccessToken(id, 'any_token')
    const account = await db.client.user.findFirst({
      where: { id: id }
    })
    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('any_token')
  })

  test('Should return an account on loudByToken without role', async () => {
    const sut = makeSut()
    await db.client.user.create({
      data: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        accessToken: 'any_token'
      }
    })
    const account = await sut.loadByToken('any_token')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@email.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account on loudByToken with role', async () => {
    const sut = makeSut()
    await db.client.user.create({
      data: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'any_role'
      }
    })
    const account = await sut.loadByToken('any_token', 'any_role')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@email.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return null if loudByToken fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByToken('any_token')
    expect(account).toBeFalsy()
  })
})
