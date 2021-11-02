import { AccountModel, AddAccountModel } from '@domain/contracts/addAccount'

export interface AddAccountRepository {
    add (accountData: AddAccountModel): Promise<AccountModel>
}
