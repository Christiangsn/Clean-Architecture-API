import { Prisma as sut } from './prismaHelpers'

describe('Prisma Helpers', () => {
  beforeAll(async () => {
    await sut.connection()
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if database is down', async () => {
    const accounts = await sut.client.user
    expect(accounts).toBeTruthy()
  })
})
