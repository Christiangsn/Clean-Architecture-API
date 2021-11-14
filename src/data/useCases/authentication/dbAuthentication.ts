import { Authentication, AuthenticationModel } from '@domain/contracts/authentication'
import { loadAccountByEmailRepository } from '@data/protocols/database/loadAccountByEmailRepository'
import { HashCompare } from '@data/protocols/criptografy/hash'

export class DbAuthentication implements Authentication {
  constructor (
        private loadAccountByEmailRepository: loadAccountByEmailRepository,
        private hashCompare: HashCompare
  ) {}

  async auth ({ email, password }: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(email)

    if (!account) {
      return null
    }

    await this.hashCompare.compare(password, account.password)
    return null
  }
}
