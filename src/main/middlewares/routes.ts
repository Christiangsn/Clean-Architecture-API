import express, { Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export const routes = (app: express.Application): void => {
  const router = Router()
  app.use('/api', router)
  // fg.sync('**/src/main/routes/**routes.ts').map(async file => {
  //   (await import(`../../../${file}`)).default(router)
  // })`${__dirname}/../routes`
  readdirSync(path.join(__dirname, '/../routes')).map(async file => {
    if (!file.includes('.test.')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
