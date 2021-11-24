import { LoadSurveysInput, SurveysModel } from '@domain/contracts/loadSurveys'
import { ILoadAnswerEntity } from './loadAnswerEntitiy'

class ILoadSurveysEntity implements SurveysModel {
  id: string
  question: string
  createdAt: Date
  answers: ILoadAnswerEntity[]

  constructor (props: LoadSurveysInput) {
    this.id = props.id
    this.question = props.question
    this.createdAt = props.createdAt
    this.answers = props.answers

    Object.freeze(this)
  }
}

export { ILoadSurveysEntity }
