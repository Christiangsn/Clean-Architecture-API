import { TokenGenerator } from '@data/protocols/criptografy/token'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements TokenGenerator {
  private readonly secret: string

  constructor (secret: string) {
    this.secret = secret
  }

  async generate (id: string): Promise<string> {
    await jwt.sign(
      {
        id
      },
      this.secret
    )
    return null
  }
}
