import { RequiredFieldValidation } from '@validation/validators/fields/requiredFieldValidate'
import { ValidationComposite } from '@validation/validators/validationComposite'
import { makeSurveyValidation } from './addSurveyValidation'
import { IValidation } from '@presentation/protocol/validation'

jest.mock('@validation/validators/validationComposite')

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSurveyValidation()
    const validations: IValidation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
