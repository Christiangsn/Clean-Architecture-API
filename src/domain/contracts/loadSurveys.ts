import { AwnserModel, LoadSurveyAnswerInput } from './loadAnswer'

export interface SurveysModel {
    id: string
    question: string
    createdAt: Date
    answers: AwnserModel[]
}

export interface LoadSurveysInput {
    id: string
    question: string
    createdAt: Date
    answers: LoadSurveyAnswerInput[]
}

export interface LoadSurveysModel {
    id: string
    question: string
    createdAt: Date
    answers: LoadSurveyAnswerInput[]
}

export interface LoadSurveys {
    load (): Promise<SurveysModel[]>
}
