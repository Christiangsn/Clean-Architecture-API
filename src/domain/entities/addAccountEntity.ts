import { AccountModel, AddAccountInput } from '../contracts/addAccount'

class IAddAccountEntity implements AccountModel {
  public id: string
  public name: string
  public email: string
  public password: string

  constructor (props: AddAccountInput) {
    this.id = props.id
    this.name = props.name
    this.email = props.email
    this.password = props.password

    Object.freeze(this)
  }
}

export { IAddAccountEntity }
