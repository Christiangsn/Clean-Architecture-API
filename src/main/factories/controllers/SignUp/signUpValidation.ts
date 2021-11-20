import { CompareFieldValidate } from '@validation/validators/compare/compareFieldsValidate'
import { EmailValidate } from '@validation/validators/email/emailRequestValidate'
import { RequiredFieldValidation } from '@validation/validators/fields/requiredFieldValidate'
import { IValidation } from '@presentation/protocol/validation'
import { ValidationComposite } from '@validation/validators/validationComposite'
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
