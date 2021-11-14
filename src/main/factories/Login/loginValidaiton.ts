import { EmailValidate } from '@presentation/helpers/validators/email/emailRequestValidate'
import { RequiredFieldValidation } from '@presentation/helpers/validators/fields/requiredFieldValidate'
import { IValidation } from '@presentation/protocol/validation'
import { ValidationComposite } from '@presentation/helpers/validators/validationComposite'
import { EmailValidatorAdapter } from '@util/emailValidatorAdapter'

export const makeLoginValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidate('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
