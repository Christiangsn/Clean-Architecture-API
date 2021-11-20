import { IInvalidParamsError } from '@presentation/errors'
import { IEmailValidator } from '@validation/protocols/emailValidator'
import { IValidation } from '../../../presentation/protocol/validation'

export class EmailValidate implements IValidation {
  constructor (
    private fieldName: string,
    private emailValidator: IEmailValidator
  ) { }

  validate (input: any): Error {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new IInvalidParamsError(this.fieldName)
    }
  }
}
