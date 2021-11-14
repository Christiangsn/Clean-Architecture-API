import { IInvalidParamsError } from '@presentation/errors'
import { IValidation } from './validation'

export class CompareFieldValidate implements IValidation {
  constructor (
    private fieldName: string,
    private fieldCompareName: string
  ) { }

  validate (input: any): Error {
    console.log(input)
    console.log(this.fieldCompareName, this.fieldName)
    if (input[this.fieldName] !== input[this.fieldCompareName]) {
      return new IInvalidParamsError(this.fieldCompareName)
    }
  }
}
