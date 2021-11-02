import request from 'supertest'
import app from '../app'

describe('Content Type Middleware', () => {
  test('Should return default content typeas json', async () => {
    app.get('/test_content', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_content')
      .expect('content-type', /json/)
  })
})
