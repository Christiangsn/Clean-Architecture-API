import { makeAddSurveyController } from '@main/factories/controllers/Survey/addSurveyFactory'
import { Router } from 'express'
import { adaptRoute } from '../adapters/express'

export default (router: Router): void => {
  router.post('/survey', adaptRoute(makeAddSurveyController()))
}
