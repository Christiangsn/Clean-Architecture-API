/* eslint-disable no-use-before-define */

export interface AddSurveyModel {
    question: string;
    answers: SurveyAnswer[]
}

export interface SurveyAnswer {
    image?: string;
    answer: string
}

export interface AddSurvey {
    add (survey: AddSurveyModel): Promise<void>
}
