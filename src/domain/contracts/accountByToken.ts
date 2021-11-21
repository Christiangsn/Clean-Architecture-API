import { AccountModel } from './addAccount'

export interface LoadAccountByToken {
    load (accessToken: string, role?: string): Promise<AccountModel>
}
