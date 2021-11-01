import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bscryptAdapter'

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', async () => {
    const sut = new BcryptAdapter(12)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })
})
