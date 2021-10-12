import { getInitialData ,createUser ,saveQuestion ,saveQuestionAnswer } from "../utils/api";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";
import { addUser } from "./addNewUser";
import { addQuestion } from "./addQuestion";
import { setAuthedUser } from "./authentication";
import { answerQuestion } from "./answerQuestion";
import { updateUserAnswer } from "./updateUserAnswer";


export function handleInitialData () {
    return (dispatch) => {
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveQuestions(questions))
                dispatch(receiveUsers(users))
            })
    }
}

export function saveUserQuestionAnswer ({ authedUser, qid, answer }){
    return (dispatch) => {
        return saveQuestionAnswer({ authedUser, qid, answer })
            .then(()=>{
                dispatch(answerQuestion({ authedUser, qid, answer }))
                dispatch(updateUserAnswer({ authedUser, qid, answer }))
            })
    }
}


export function addNewUser (user){
    return (dispatch) => {
        return createUser(user)
            .then(dispatch(addUser(user)))
    }
}

export function addNewQuestion (question){
    return (dispatch) => {
        return saveQuestion(question)
            .then(dispatch(addQuestion(question)))
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