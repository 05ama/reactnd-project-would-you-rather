import { RECEIVE_QUESTIONS } from "../actions/questions";
import { SET_QUESTION_ANSWER } from "../actions/answerQuestion"
import { ADD_QUESTION } from "../actions/addQuestion";

export default function questions (state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS :
            return {
                ...state,
                ...action.questions
            }
        case SET_QUESTION_ANSWER:
            return {
                    ...state,
                    [action.action.qid]: {
                      ...state[action.action.qid],
                      [action.action.answer]: {
                        ...state[action.action.qid][action.action.answer],
                        votes: state[action.action.qid][action.action.answer].votes.concat([action.action.authedUser])
                      }
                    }
            }
        case ADD_QUESTION :
            return {
                ...state,
                ...action.questions
            }            
        default :
            return state
    }
}        