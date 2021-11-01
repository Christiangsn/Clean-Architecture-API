import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const PrismaHelper = {
  client: null as PrismaClient,
  async connect (): Promise<void> {
    this.client = await prisma.$connect()
  },
  async disconnect (): Promise<void> {
    await this.client.disconnect()
  }
}
