import express from 'express'
import { bodyParser } from './middlewares/bodyParser'
import { cors } from './middlewares/cors'
import { defaultHeaders } from './middlewares/contentType'

class App {
  public app: express.Application

  constructor () {
    this.app = express()
    this.middlewares()
  }

  private middlewares (): void {
    this.app.use(bodyParser)
    this.app.use(cors)
    this.app.use(defaultHeaders)
  }
}

export default new App().app
