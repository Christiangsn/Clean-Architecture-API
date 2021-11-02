import request from 'supertest'
import app from '../app'

describe('SignUp Routes', () => {
  test('Should returns an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Christian',
        email: 'christian@gmail.com',
        password: '123',
        passwordConfirm: '123'
      })
      .expect(200)
  })
})
