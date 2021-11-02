import express from 'express'
import { bodyParser } from './middlewares/bodyParser'
import { cors } from './middlewares/cors'
import { defaultHeaders } from './middlewares/contentType'
import { routes } from './middlewares/routes'

class App {
  public app: express.Application

  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.app.use(bodyParser)
    this.app.use(cors)
    this.app.use(defaultHeaders)
  }

  private routes (): void {
    routes(this.app)
  }
}

export default new App().app
