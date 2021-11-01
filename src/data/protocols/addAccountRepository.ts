import { AddAccountModel } from '../../domain/useCases/AddAccount'
import { AccountModel } from '../../domain/entities/Account'

export interface AddAccountRepository {
    add (accountData: AddAccountModel): Promise<AccountModel>
}
