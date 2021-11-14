import { CompareFieldValidate } from '@presentation/helpers/validators/compareFieldsValidate'
import { RequiredFieldValidation } from '@presentation/helpers/validators/requiredFieldValidate'
import { IValidation } from '@presentation/helpers/validators/validation'
import { ValidationComposite } from '@presentation/helpers/validators/validationComposite'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirm']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new CompareFieldValidate('password', 'passwordConfirm'))

  return new ValidationComposite(validations)
}
