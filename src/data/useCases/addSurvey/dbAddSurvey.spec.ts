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

interface SutTypes {
    sut: DbAddSurvey,
    addSurveyRepositoryStub: AddSurveyRepository
}

const makeAddSurveyRepositoryStub = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyModel): Promise<void> {
      return new Promise((resolve, reject) => { resolve() })
    }
  }

  return new AddSurveyRepositoryStub()
}

const makeSut = (): SutTypes => {
  const addSurveyRepositoryStub = makeAddSurveyRepositoryStub()
  const sut = new DbAddSurvey(addSurveyRepositoryStub)

  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey UseCase', () => {
  test('Should call AddSurveyRepository with correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')

    await sut.add(makeFakeSurveyData())
    expect(addSpy).toHaveBeenCalledWith(makeFakeSurveyData())
  })
})
