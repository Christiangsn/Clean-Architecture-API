import { IInvalidParamsError } from '@presentation/errors'
import { IValidation } from '../../../presentation/protocol/validation'

export class CompareFieldValidate implements IValidation {
  constructor (
    private fieldName: string,
    private fieldCompareName: string
  ) { }

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldCompareName]) {
      return new IInvalidParamsError(this.fieldCompareName)
    }
  }
}
