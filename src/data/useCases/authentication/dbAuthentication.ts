import { Authentication, AuthenticationModel } from '@domain/contracts/authentication'
import { loadAccountByEmailRepository } from '@data/protocols/database/Account/loadAccountByEmailRepository'
import { HashCompare } from '@data/protocols/criptografy/hash'
import { TokenGenerator } from '@data/protocols/criptografy/token'
import { UpdateAccessTokenRepository } from '@data/protocols/database/Account/updatedAccessTokenRepository'

export class DbAuthentication implements Authentication {
  constructor (
    private loadAccountByEmailRepository: loadAccountByEmailRepository,
    private hashCompare: HashCompare,
    private tokenGenerator: TokenGenerator,
    private updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth ({ email, password }: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(email)

    if (!account) {
      return null
    }

    const isPasswordValid = await this.hashCompare.compare(password, account.password)
    if (!isPasswordValid) {
      return null
    }

    const acessToken = await this.tokenGenerator.generate(account.id)
    await this.updateAccessTokenRepository.updateAccessToken(account.id, acessToken)
    return acessToken
  }
}
