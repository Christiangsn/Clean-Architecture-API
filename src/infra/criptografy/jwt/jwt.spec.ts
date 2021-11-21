import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwtAdapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return new Promise<string>((resolve, reject) => { resolve('any_token') })
  },

  async verify (): Promise<string> {
    return new Promise<string>((resolve, reject) => { resolve('any_value') })
  }
}))

describe('JWT Adapters', () => {
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

  test('Should return a token on sign success', async () => {
    const sut = new JwtAdapter('secret')
    const accessToken = await sut.generate('any_id')
    expect(accessToken).toBe('any_token')
  })

  test('Should throw if sign throws', async () => {
    const sut = new JwtAdapter('secret')
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.generate('any_id')
    await expect(promise).rejects.toThrow()
  })

  test('Should call verify with correct values', async () => {
    const sut = new JwtAdapter('secret')
    const verifySpy = jest.spyOn(jwt, 'verify')
    await sut.decrypt('any_token')
    expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret')
  })

  test('Should return a value on verify success', async () => {
    const sut = new JwtAdapter('secret')
    const value = await sut.decrypt('any_id')
    expect(value).toBe('any_value')
  })
})
