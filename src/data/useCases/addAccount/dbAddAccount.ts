import { loadAccountByEmailRepository } from '@data/protocols/database/Account/loadAccountByEmailRepository'
import { AddAccount, AddAccountModel, AccountModel, Hasher, AddAccountRepository } from './dbAddAccountProtocols'

export class DbAddAccount implements AddAccount {
  constructor (
      private encrypter: Hasher,
      private addAccountRepository: AddAccountRepository,
      private loadAccountByEmailRepository: loadAccountByEmailRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
    const hashedPassword = await this.encrypter.hash(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, {
      password: hashedPassword
    }))
    return account
  }
}
