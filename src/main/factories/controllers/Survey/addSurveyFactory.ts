import { ProtocolControllers } from '@presentation/protocol'
import { makeLogControllerDacorator } from '@main/factories/decorators/logControllerDecoractorFactory'
import { AddSurveyController } from '@presentation/controllers/SurveyPaths/addSurvey/addSurveyController'
import { makeSurveyValidation } from './addSurveyValidation'
import { makeDbAddSurvey } from '@main/factories/useCases/AddSurvey/dbAddSurveyFactory'

export const makeAddSurveyController = (): ProtocolControllers => {
  const controller = new AddSurveyController(makeSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDacorator(controller)
}
