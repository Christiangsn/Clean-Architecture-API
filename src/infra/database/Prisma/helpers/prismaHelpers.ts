import { PrismaClient } from '@prisma/client'

class PrismaHelpers {
  client: PrismaClient

  constructor () {
    this.client = new PrismaClient()
  }

  async connection (): Promise<void> {
    this.client = new PrismaClient()
  }

  async disconnect (): Promise<void> {
    this.client.$disconnect()
  }
}

export default new PrismaHelpers().client
