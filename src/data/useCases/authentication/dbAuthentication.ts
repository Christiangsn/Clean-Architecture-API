import { Authentication, AuthenticationModel } from '@domain/contracts/authentication'
import { loadAccountByEmailRepository } from '@data/protocols/loadAccountByEmailRepository'

export class DbAuthentication implements Authentication {
  constructor (
        private loadAccountByEmailRepository: loadAccountByEmailRepository
  ) {}

  async auth ({ email, password }: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailRepository.load(email)
    return null
  }
}
