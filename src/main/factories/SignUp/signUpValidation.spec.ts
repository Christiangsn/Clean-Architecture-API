import { RequiredFieldValidation } from '../../../presentation/helpers/validators/fields/requiredFieldValidate'
import { ValidationComposite } from '@presentation/helpers/validators/validationComposite'
import { makeSignUpValidation } from './signUpValidation'
import { IValidation } from '@presentation/protocol/validation'
import { CompareFieldValidate } from '@presentation/helpers/validators/compare/compareFieldsValidate'
import { EmailValidate } from '@presentation/helpers/validators/email/emailRequestValidate'
import { IEmailValidator } from '@presentation/protocol/emailValidator'

jest.mock('@presentation/helpers/validators/validationComposite')

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('SignUpValidaiton Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: IValidation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirm']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidate('password', 'passwordConfirm'))
    validations.push(new EmailValidate('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
