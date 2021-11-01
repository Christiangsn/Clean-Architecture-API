import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bscryptAdapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise((resolve, reject) => {
      resolve('hash')
    })
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const sut = new BcryptAdapter(12)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })

  test('Should return a hash on success', async () => {
    const sut = new BcryptAdapter(12)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
