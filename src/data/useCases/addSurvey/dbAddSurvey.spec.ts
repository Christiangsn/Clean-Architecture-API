import { AddSurveyRepository } from '@data/protocols/database/Survey/addSurveyRepository'
import { AddSurveyModel } from '@domain/contracts/addSurvey'
import { DbAddSurvey } from './dbAddSurvey'

const makeFakeSurveyData = (): AddSurveyModel => ({

  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }]

})

describe('DbAddSurvey UseCase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    class AddSurveyRepositoryStub implements AddSurveyRepository {
      async add (surveyData: AddSurveyModel): Promise<void> {
        return new Promise((resolve, reject) => { resolve() })
      }
    }

    const addSurveyRepositoryStub = new AddSurveyRepositoryStub()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    const sut = new DbAddSurvey(addSurveyRepositoryStub)

    await sut.add(makeFakeSurveyData())
    expect(addSpy).toHaveBeenCalledWith(makeFakeSurveyData())
  })
})
