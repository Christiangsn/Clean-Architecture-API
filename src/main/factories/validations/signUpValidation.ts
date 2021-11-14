import { CompareFieldValidate } from '@presentation/helpers/validators/compareFieldsValidate'
import { EmailValidate } from '@presentation/helpers/validators/email/emailRequestValidate'
import { RequiredFieldValidation } from '@presentation/helpers/validators/fields/requiredFieldValidate'
import { IValidation } from '@presentation/helpers/validators/validation'
import { ValidationComposite } from '@presentation/helpers/validators/validationComposite'
import { EmailValidatorAdapter } from '@util/emailValidatorAdapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirm']) {
    validations.push(new RequiredFieldValidation(field))
  }

  validations.push(new CompareFieldValidate('password', 'passwordConfirm'))
  validations.push(new EmailValidate('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
