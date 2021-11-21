import { DecrypterToken } from '@data/protocols/criptografy/decrypter'
import { LoadAccountByTokenRepository } from '@data/protocols/database/Account/loadAccountByTokenRepository copy'
import { LoadAccountByToken } from '@domain/contracts/accountByToken'
import { AccountModel } from '../addAccount/dbAddAccountProtocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private decrypter: DecrypterToken,
    private loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)

    if (token) {
      await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
    }

    return null
  }
}
