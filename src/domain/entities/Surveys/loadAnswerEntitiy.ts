import { AwnserModel, LoadSurveyAnswerInput } from '@domain/contracts/loadAnswer'

class ILoadAnswerEntity implements AwnserModel {
  id: string
  image?: string
  answer: string
  createdAt: Date

  constructor (props: LoadSurveyAnswerInput) {
    this.id = props.id
    this.answer = props.answer
    this.createdAt = props.createdAt
    this.image = props.image

    Object.freeze(this)
  }
}

export { ILoadAnswerEntity }
