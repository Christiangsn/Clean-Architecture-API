import { PrismaClient } from '@prisma/client'

class PrismaHelpers {
  client: PrismaClient

  constructor () {
    this.connection()
  }

  async connection (): Promise<void> {
    this.client = new PrismaClient()
  }

  async disconnect (): Promise<void> {
    this.client.$disconnect()
    this.client = null
  }
}

export default new PrismaHelpers().connection
