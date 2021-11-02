import db from '@infra/database/Prisma/helpers/prismaHelpers'

db.$connect()
  .then(async () => {
    const app = (await import('./app')).default
    app.listen(process.env.APP_PORT, () => {
      console.log(`Server running at http://localhost:${process.env.APP_PORT}`)
    })
  })
  .catch(console.error)
