import request from 'supertest'
import app from '../app'

describe('Body Parser Middleware', () => {
  test('Should parser body as json', async () => {
    app.post('/testBodyParser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/testBodyParser')
      .send({ name: 'Rodrigo' })
      .expect({ name: 'Rodrigo' })
  })
})
