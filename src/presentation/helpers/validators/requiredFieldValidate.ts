import { IMissingParamError } from '@presentation/errors'
import { IValidation } from './validation'

export class RequiredFieldValidation implements IValidation {
  constructor (
    private fieldName: string
  ) { }

  validate (input: any): Error {
    if (!input(this.fieldName)) {
      return new IMissingParamError(this.fieldName)
    }
  }
}
