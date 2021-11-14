import { IMissingParamError } from '@presentation/errors'
import { RequiredFieldValidation } from './requiredFieldValidate'

describe('RequiredField Validate', () => {
  test('Should return a MissignParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field')
    const error = sut.validate({ name: 'any_name ' })
    expect(error).toEqual(new IMissingParamError('field'))
  })
})
