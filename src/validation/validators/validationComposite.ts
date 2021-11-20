import { IValidation } from '../../presentation/protocol/validation'

export class ValidationComposite implements IValidation {
  constructor (
    private validation: IValidation[]
  ) { }

  validate (input: any): Error {
    for (const validation of this.validation) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
