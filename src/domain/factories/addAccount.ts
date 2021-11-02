import { IAddAccountEntity } from '../entities/addAccountEntity'
import { User } from '@prisma/client'
import { AddAccountMapper, AccountModel } from '../contracts/addAccount'

class AddAccountFactory implements AddAccountMapper {
  public addFactory ({ id, name, email, password } : User): AccountModel {
    return new IAddAccountEntity({
      id, name, email, password
    })
  }
}

export { AddAccountFactory }
