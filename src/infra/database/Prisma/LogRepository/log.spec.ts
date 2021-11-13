import { Prisma as db } from '../helpers/prismaHelpers'
import { logsError } from '@prisma/client'
import { LogPrismaRepository } from './log'

describe('Log Mongo Repository ', () => {
  // eslint-disable-next-line no-unused-vars
  let Errors: logsError[]

  beforeAll(async () => {
    await db.connection()
  })

  afterAll(async () => {
    await db.disconnect()
  })

  beforeEach(async () => {
    Errors = await db.client.logsError.findMany()
    await db.client.logsError.deleteMany({})
  })

  test('should create an error log on success', async () => {
    const sut = new LogPrismaRepository()
    await sut.logError('any_error')
    const count = Errors.length
    expect(count).toBe(1)
  })
})
