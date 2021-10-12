export const SET_QUESTION_ANSWER = 'SET_QUESTION_ANSWER'

export function answerQuestion ({ authedUser, qid, answer }) {
    return {
        type: SET_QUESTION_ANSWER,
        action: { authedUser, qid, answer }
    }
}