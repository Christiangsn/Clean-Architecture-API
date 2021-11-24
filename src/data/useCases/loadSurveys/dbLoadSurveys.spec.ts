import { LoadSurveysRepository } from '@data/protocols/database/Survey/loadSurveysRepository'
import { LoadSurveysModel, SurveysModel } from '@domain/contracts/loadSurveys'
import { DbLoadSurveys } from './dbLoadSurveys'

const makeFakeSurveys = (): SurveysModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    createdAt: new Date(),
    answers: [{
      id: 'any_id',
      image: 'any_image',
      answer: 'any_answer',
      createdAt: new Date()
    }]
  }, {
    id: 'other_id',
    question: 'other_question',
    createdAt: new Date(),
    answers: [{
      id: 'other_id',
      image: 'other_image',
      answer: 'other_answer',
      createdAt: new Date()
    }]
  }]
}

const makeLoadSurveysRepositoryStub = (): LoadSurveysRepository => {
  class LoadSurveysRepository implements LoadSurveysRepository {
    async loadAll (): Promise<LoadSurveysModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }

  return new LoadSurveysRepository()
}

interface sutTypes {
    sut: any;
    loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeSut = (): sutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepositoryStub()
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub)

  return {
    sut,
    loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  test('Shoudl call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const loadAllApy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load()
    expect(loadAllApy).toHaveBeenCalled()
  })

  test('Shoudl return a list of Surveys on success', async () => {
    const { sut } = makeSut()

    const surveys = await sut.load()
    expect(surveys).toEqual(makeFakeSurveys())
  })
})
