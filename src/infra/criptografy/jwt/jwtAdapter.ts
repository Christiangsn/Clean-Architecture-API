import { DecrypterToken } from '@data/protocols/criptografy/decrypter'
import { TokenGenerator } from '@data/protocols/criptografy/token'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements TokenGenerator, DecrypterToken {
  private readonly secret: string

  constructor (secret: string) {
    this.secret = secret
  }

  async generate (id: string): Promise<string> {
    const accessToken = await jwt.sign(
      {
        id
      },
      this.secret
    )
    return accessToken
  }

  async decrypt (token: string): Promise<string> {
    await jwt.verify(token, this.secret)
    return null
  }
}
