import { User } from '@prisma/client'

export interface AddAccountInput {
    id?: string;
    name: string;
    email: string;
    password: string;
}

export interface AddAccountModel {
    name: string;
    email: string;
    password: string
}

export interface AccountModel {
    id: string;
    name: string;
    email: string;
    password: string
}

export interface AddAccount {
    add (account: AddAccountModel): Promise<AccountModel>
}

export interface AddAccountMapper {
    addFactory (account: User): AccountModel
}
