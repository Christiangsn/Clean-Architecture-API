import { AccountModel } from '@domain/contracts/addAccount'

export interface loadAccountByEmailRepository {
    load (email: string): Promise<AccountModel>
}
