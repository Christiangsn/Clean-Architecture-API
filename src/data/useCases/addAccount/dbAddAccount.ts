import { AddAccount, AddAccountModel, AccountModel, Encrypter, AddAccountRepository } from './dbAddAccountProtocols'

export class DbAddAccount implements AddAccount {
  constructor (
      private encrypter: Encrypter,
      private addAccountRepository: AddAccountRepository
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepository.add(Object.assign({}, accountData, {
      password: hashedPassword
    }))
    return new Promise(resolve => resolve(null))
  }
}
