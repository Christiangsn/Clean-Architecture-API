import { IInvalidParamsError } from '@presentation/errors'
import { IEmailValidator } from '@presentation/protocol/emailValidator'
import { IValidation } from './validation'

export class EmailValidate implements IValidation {
  constructor (
    private fieldName: string,
    private emailValidator: IEmailValidator
  ) { }

  validate (input: any): Error {
    console.log(input)
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new IInvalidParamsError(this.fieldName)
    }
  }
}
