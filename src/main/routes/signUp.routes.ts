import { Router } from 'express'
import { adaptRoute } from '../adapters/express'
import { makeSignUpController } from '../factories/SignUp/singup'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
