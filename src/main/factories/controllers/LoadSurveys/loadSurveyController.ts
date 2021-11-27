import { ProtocolControllers } from '@presentation/protocol'
import { makeLogControllerDacorator } from '@main/factories/decorators/logControllerDecoractorFactory'
import { makeDbLoadSurveys } from '@main/factories/useCases/LoadSurveys/dbLoadSurveysFactory'
import { LoadSurveysController } from '@presentation/controllers/SurveyPaths/loudServeys/loadSurveysController'

export const makeLoadSurveysController = (): ProtocolControllers => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDacorator(controller)
}
