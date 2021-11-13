import { LogErrorRepository } from '@data/protocols/logErrorRepository'
import { Prisma } from '../helpers/prismaHelpers'

class LogPrismaRepository implements LogErrorRepository {
  async logError (stackError: string): Promise<void> {
    await Prisma.client.logsError.create({
      data: {
        stack: stackError,
        created_at: new Date()
      }
    })
  }
}

export { LogPrismaRepository }
