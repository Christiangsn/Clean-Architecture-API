import { Prisma } from '@infra/database/Prisma/helpers/prismaHelpers'

Prisma.connection()
  .then(async () => {
    console.log('Database is running...')
    const app = (await import('./app')).default
    app.listen(process.env.APP_PORT, () => {
      console.log(`Server running at http://localhost:${process.env.APP_PORT}`)
    })
  })
  .catch(console.error)
