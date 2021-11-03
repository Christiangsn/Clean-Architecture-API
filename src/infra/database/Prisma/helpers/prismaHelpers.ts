import { PrismaClient } from '@prisma/client'

class PrismaHelpers {
  client: PrismaClient

  constructor () {
    this.client = new PrismaClient()
    this.connection()
  }

  async connection (): Promise<void> {
    this.client.$connect()
  }

  async disconnect (): Promise<void> {
    this.client.$disconnect()
    this.client = null
  }
}

export const Prisma = new PrismaHelpers()
