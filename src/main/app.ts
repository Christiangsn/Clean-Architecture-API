import express from 'express'
import { bodyParser } from './middlewares/bodyParser'

class App {
  public app: express.Application

  constructor () {
    this.app = express()
    this.middlewares()
  }

  private middlewares (): void {
    this.app.use(bodyParser)
  }
}

export default new App().app
