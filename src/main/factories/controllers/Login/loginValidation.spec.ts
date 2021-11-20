import { RequiredFieldValidation } from '@validation/validators/fields/requiredFieldValidate'
import { ValidationComposite } from '@validation/validators/validationComposite'
import { makeLoginValidation } from './loginValidation'
import { IValidation } from '@presentation/protocol/validation'
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

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation()
    const validations: IValidation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidate('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
