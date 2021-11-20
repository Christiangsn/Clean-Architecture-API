import { RequiredFieldValidation } from '@validation/validators/fields/requiredFieldValidate'
import { ValidationComposite } from '@validation/validators/validationComposite'
import { makeSignUpValidation } from './signUpValidation'
import { IValidation } from '@presentation/protocol/validation'
import { CompareFieldValidate } from '@validation/validators/compare/compareFieldsValidate'
import { EmailValidate } from '@validation/validators/email/emailRequestValidate'
import { IEmailValidator } from '@validation/protocols/emailValidator'

jest.mock('@validation/validators/validationComposite')

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
