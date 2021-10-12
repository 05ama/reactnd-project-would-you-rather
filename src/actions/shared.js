import { getInitialData ,createUser ,saveQuestion ,saveQuestionAnswer } from "../utils/api";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { addUser } from "./addNewUser";
import { addQuestion } from "./addQuestion";
import { setAuthedUser } from "./authentication";
import { answerQuestion } from "./answerQuestion";
import { updateUserAnswer } from "./updateUserAnswer";
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveQuestions(questions))
                dispatch(receiveUsers(users))
                dispatch(hideLoading())
            })
    }
}

export function saveUserQuestionAnswer ({ authedUser, qid, answer }){
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestionAnswer({ authedUser, qid, answer })
            .then(()=>{
                dispatch(answerQuestion({ authedUser, qid, answer }))
                dispatch(updateUserAnswer({ authedUser, qid, answer }))
                dispatch(hideLoading())
            })
    }
}


export function addNewUser (user){
    return (dispatch) => {
        dispatch(showLoading())
        return createUser(user)
            .then(()=>{
                dispatch(addUser(user))
                dispatch(hideLoading())
            })
    }
}

export function addNewQuestion (question){
    return (dispatch) => {
        dispatch(showLoading())
        return saveQuestion(question)
            .then(()=>{
                dispatch(addQuestion(question))
                dispatch(hideLoading())
            })
    }
}

export function successLogIn (id) {
    return (dispatch) => {
        dispatch(setAuthedUser(id))
    }
}

export function logOut () {
    return (dispatch) => {
        dispatch(setAuthedUser(null))
    }
}