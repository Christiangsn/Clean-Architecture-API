import { Authentication, AuthenticationModel } from '@domain/contracts/authentication'
import { loadAccountByEmailRepository } from '@data/protocols/database/loadAccountByEmailRepository'
import { HashCompare } from '@data/protocols/criptografy/hash'
import { TokenGenerator } from '@data/protocols/criptografy/token'

export class DbAuthentication implements Authentication {
  constructor (
    private loadAccountByEmailRepository: loadAccountByEmailRepository,
    private hashCompare: HashCompare,
    private tokenGenerator: TokenGenerator
  ) {}

  async auth ({ email, password }: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(email)

    if (!account) {
      return null
    }

    await this.hashCompare.compare(password, account.password)
    await this.tokenGenerator.generate(account.id)
    return null
  }
}
