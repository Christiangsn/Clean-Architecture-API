import { DecrypterToken } from '@data/protocols/criptografy/decrypter'
import { LoadAccountByToken } from '@domain/contracts/accountByToken'
import { AccountModel } from '../addAccount/dbAddAccountProtocols'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private decrypter: DecrypterToken
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    return null
  }
}
