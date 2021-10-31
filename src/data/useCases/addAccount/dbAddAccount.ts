import { AddAccount, AddAccountModel } from '../../../domain/useCases/AddAccount'
import { AccountModel } from '../../../domain/entities/Account'
import { Encrypter } from '../../protocols/encripter'

export class DbAddAccount implements AddAccount {
  constructor (
      private encrypter: Encrypter
  ) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    await this.encrypter.encrypt(account.password)
    return new Promise(resolve => resolve(null))
  }
}
