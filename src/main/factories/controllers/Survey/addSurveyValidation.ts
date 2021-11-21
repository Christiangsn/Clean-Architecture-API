import { RequiredFieldValidation } from '@validation/validators/fields/requiredFieldValidate'
import { IValidation } from '@presentation/protocol/validation'
import { ValidationComposite } from '@validation/validators/validationComposite'

export const makeSurveyValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
