import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwtAdapter'

describe('', () => {
  test('Should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.generate('any_id')
    expect(signSpy).toHaveBeenCalledWith({
      id: 'any_id'
    },
    'secret'
    )
  })
})
