import { Prisma } from '@infra/database/Prisma/helpers/prismaHelpers'

Prisma.connection()
  .then(async () => {
    console.log('Database is running...')
    const app = (await import('./app')).default
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`)
    })
  })
  .catch(console.error)
