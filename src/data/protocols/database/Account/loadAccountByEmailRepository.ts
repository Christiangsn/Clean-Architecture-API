import { AccountModel } from '@domain/contracts/addAccount'

export interface loadAccountByEmailRepository {
    loadByEmail (email: string): Promise<AccountModel>
}
