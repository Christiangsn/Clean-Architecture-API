import { IMissingParamError } from '@presentation/errors'
import { IValidation } from './validation'
import { ValidationComposite } from './validationComposite'

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

interface SutTypes {
    sut: ValidationComposite
    validationStub: IValidation
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const sut = new ValidationComposite([validationStub])
  return {
    sut,
    validationStub
  }
}

describe('Validation Composite', () => {
  test('Should return an a error if any validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new IMissingParamError('field'))
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new IMissingParamError('field'))
  })
})
