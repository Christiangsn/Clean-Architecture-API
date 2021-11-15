import { RequiredFieldValidation } from '../../../presentation/helpers/validators/fields/requiredFieldValidate'
import { ValidationComposite } from '@presentation/helpers/validators/validationComposite'
import { makeLoginValidation } from './loginValidation'
import { IValidation } from '@presentation/protocol/validation'
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
