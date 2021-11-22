import { AccountModel } from '@domain/contracts/addAccount'

export interface LoadAccountByTokenRepository {
    loadByToken (token: string, role?: string): Promise<AccountModel>
}
