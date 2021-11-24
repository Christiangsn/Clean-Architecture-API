import { LoadSurveys, SurveysModel } from '@domain/contracts/loadSurveys'
import { noContent, ok, serverError } from '@presentation/helpers/http/httpHelper'
import { LoadSurveysController } from './loadSurveysController'

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

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveysModel[]> {
      return new Promise(resolve => resolve(makeFakeSurveys()))
    }
  }

  return new LoadSurveysStub()
}

interface sutTypes {
  sut: any;
  loudSurveysStub: LoadSurveys
}

const makeSut = (): sutTypes => {
  const loudSurveysStub = makeLoadSurveys()
  const sut = new LoadSurveysController(loudSurveysStub)

  return {
    sut,
    loudSurveysStub
  }
}

describe('LoadSurveys Controller', () => {
  test('Should call LoadSurveys', async () => {
    const { sut, loudSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loudSurveysStub, 'load')

    sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should returns 200 on success', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeSurveys()))
  })

  test('Should returns 204 if LoadSurveys returns empty', async () => {
    const { sut, loudSurveysStub } = makeSut()
    jest.spyOn(loudSurveysStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => resolve([])))

    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('Should returns 500 if LoadSurveys throws', async () => {
    const { sut, loudSurveysStub } = makeSut()
    jest.spyOn(loudSurveysStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))

    const httpResponse = await sut.handle(makeFakeSurveys())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
