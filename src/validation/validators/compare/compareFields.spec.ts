import { IInvalidParamsError } from '@presentation/errors'
import { CompareFieldValidate } from './compareFieldsValidate'

const makeSut = (): CompareFieldValidate => {
  return new CompareFieldValidate('field', 'fieldToCompare')
}

describe('CompareFields Validate', () => {
  test('Should return a InvalidParamsError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'random_value'
    })
    expect(error).toEqual(new IInvalidParamsError('fieldToCompare'))
  })

  test('Should not return if validation success', () => {
    const sut = makeSut()
    const error = sut.validate({
      field: 'any_value',
      fieldToCompare: 'any_value'
    })
    expect(error).toBeFalsy()
  })
})
