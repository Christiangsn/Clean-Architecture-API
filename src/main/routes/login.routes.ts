import { Router } from 'express'
import { adaptRoute } from '../adapters/express'
import { makeSignUpController } from '../factories/SignUp/singup'
import { makeLoginController } from '../factories/Login/loginFactory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
