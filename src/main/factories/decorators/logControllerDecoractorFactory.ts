import { LogPrismaRepository } from '@infra/database/Prisma/Log/logPrismaRepository'
import { ProtocolControllers } from '@presentation/protocol'
import { LogControllerDecorator } from '@main/decorators/logControllerDecorator'

export const makeLogControllerDacorator = (controller: ProtocolControllers): ProtocolControllers => {
  const logPrismaRepository = new LogPrismaRepository()
  return new LogControllerDecorator(controller, logPrismaRepository)
}
