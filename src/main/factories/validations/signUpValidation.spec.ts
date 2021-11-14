import { RequiredFieldValidation } from './../../../presentation/helpers/validators/requiredFieldValidate'
import { ValidationComposite } from '@presentation/helpers/validators/validationComposite'
import { makeSignUpValidation } from './signUpValidation'
import { IValidation } from '@presentation/helpers/validators/validation'
import { CompareFieldValidate } from '@presentation/helpers/validators/compareFieldsValidate'

jest.mock('@presentation/helpers/validators/validationComposite')

describe('SignUpValidaiton Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: IValidation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirm']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldValidate('password', 'passwordConfirm'))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
