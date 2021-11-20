import { IMissingParamError } from '@presentation/errors'
import { RequiredFieldValidation } from './requiredFieldValidate'

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('RequiredField Validate', () => {
  test('Should return a MissignParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ name: 'any_name ' })
    expect(error).toEqual(new IMissingParamError('field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name ' })
    expect(error).toBeFalsy()
  })
})
