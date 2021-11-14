import { IMissingParamError } from '@presentation/errors'
import { IValidation } from './validation'
import { ValidationComposite } from './validationComposite'

describe('Validation Composite', () => {
  test('Should return an a error if any validation fails', () => {
    class ValidationStub implements IValidation {
      validate (input: any): Error {
        return new IMissingParamError('field')
      }
    }
    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new IMissingParamError('field'))
  })
})
